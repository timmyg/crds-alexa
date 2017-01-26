var https = require('https')
var moment = require('moment')

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
          case "Garbage":
            console.log("Garbage...");
            throw "Invalid intent"

          case "GetNextServiceTime":
            var text = moment().add(3, 'd').calendar();
            context.succeed(
              generateResponse(
                buildSpeechletResponse(text, true),
                {}
              )
            )
/*          
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
*/
            break;

            case "WhatIs":
              var endpoint = "https://www.crossroads.net/proxy/content//api/SiteConfig/1"
              var body = ""
              https.get(endpoint, (response) => {
                response.on('data', (chunk) => { body += chunk })
                response.on('end', () => {
                  var data = JSON.parse(body)
                  var responseText = data.siteConfig.rSS_iTunesSummary
                  context.succeed(
                    generateResponse(
                      buildSpeechletResponse(responseText, true),
                      {}
                    )
                  )
                })
              })
              break;

          case "GetScrumUpdate":
            context.succeed(
              generateResponse(
                buildSpeechletResponse('We successfully built a development version of the Crossroads Alexa skill and are now working on playing audio back rather than just text so that we can play some worship music', true),
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
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }

}
