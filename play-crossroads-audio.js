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
                                   "I cant play music on demand but here is a demo"),
                {}
              )
            )
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
buildAudioResponse = (url, outputText="", shouldEndSession=true) => {
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
