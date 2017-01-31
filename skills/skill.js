'use strict';

class Skill {
    constructor(context, request) {
        this.context = context;
        this.request = request;
    }

    execute() {
    }

    buildSpeechletResponse(outputText, shouldEndSession, isSSML, repromptSpeech) {
      let resp = {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
      }
      if (repromptSpeech) {
        resp.reprompt = {
          outputSpeech: {
              type: "PlainText",
              text: repromptSpeech
          }
        }
        resp.shouldEndSession = false;
      }
      if (isSSML) {
        resp.outputSpeech.type = "SSML";
        resp.outputSpeech.ssml = `<speak>${resp.outputSpeech.text}</speak>`;
      }
      return resp;
    }

    generateResponse(speechletResponse, sessionAttributes) {
        return {
            version: "1.0",
            sessionAttributes: sessionAttributes,
            response: speechletResponse
        }
    }
}

module.exports = Skill;
