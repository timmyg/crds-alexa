var https = require('https')

exports.handler = (event, context) => {

  try {

    if (event.session.new) {
      // New Session 
      console.log("NEW SESSION")
    }

    switch (event.request.type) {

      case "LaunchRequest":
        // Launch Request
        console.log(`LAUNCH REQUEST`)
        context.succeed(
          generateResponse(
            buildSpeechletResponse("Welcome to an Alexa Skill, this is running on a deployed lambda function", true),
            {}
          )
        )
        break;

      case "IntentRequest":
        // Intent Request
        console.log(`INTENT REQUEST`)

        switch(event.request.intent.name) {
          case "PlayMusic":
            context.succeed(
              generateResponse(
                buildAudioResponse("https://s3.amazonaws.com/crds-cms-uploads/media/messages/video/resilient-01.mp4",
                                   "I cant play music on demand but here is a demo", true),
                {}
              )
            )
            break;
          case "PlayLatestService":
              var endpoint = "https://www.crossroads.net/proxy/content/api/series";
              var body = "";
              https.get(endpoint, (response) => {
                response.on('data', (chunk) => { body += chunk });
                response.on('end', () => {
                  var data = JSON.parse(body);
                  var messages = data.series[0].messages;
                  var latestMessage = messages[messages.length - 1];
                  var url = latestMessage.messageAudio.source.filename
                  context.succeed(generateResponse(
                    buildAudioResponse(latestMessage.messageAudio.source.filename,
                                       `This service is about ${latestMessage.description}`, true), {}))
                });
              });
            break;

          default:
            throw "Invalid intent"
        }

        break;

      case "SessionEndedRequest":
        // Session Ended Request
        console.log(`SESSION ENDED REQUEST`)
        break;

      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)

    }

  } catch(error) { context.fail(`Exception: ${error}`) }

}

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {
  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }
}

buildAudioResponse = (url, outputText, shouldEndSession) => {
  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    directives: [
      {
        type: "AudioPlayer.Play",
        playBehavior: "REPLACE_ALL",
        audioItem: {
          stream: {
            token: "this-is-the-audio-token",
            url: url,
            offsetInMilliseconds: 0
          }
        }
      }
    ],
    shouldEndSession: shouldEndSession
  }
}

generateResponse = (speechletResponse, sessionAttributes) => {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }
}
