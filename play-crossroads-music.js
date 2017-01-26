var https = require('https')

exports.handler = (event, context) => {
  console.log('api key', process.env.STREAMSPOT_API_KEY)
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
          case "Garbage":
            console.log("Garbage...");
            throw "Invalid intent"

          case "PlayMusic":
            var endpoint = "https://www.crossroads.net/proxy/content/api/SystemPage/?StateName=live"
            var body = ""
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                var data = JSON.parse(body)
                var streamTimes = data.systemPages[0].description
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(streamTimes, true),
                    {}
                  )
                )
              })
            })
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

generateResponse = (speechletResponse, sessionAttributes) => {

  return {
    "version": "1.0",
    "sessionAttributes": {},
    "response": {
      "outputSpeech": {},
      "card": {},
      "reprompt": {},
      "directives": [
        {
          "type": "AudioPlayer.Play",
          "playBehavior": "string",
          "audioItem": {
            "stream": {
              "token": "string",
              "url": "string",
              "offsetInMilliseconds": 0
            }
          }
        }
      ],
      "shouldEndSession": true
    }
  }

}
