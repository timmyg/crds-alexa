'use strict';

class Skill {
    constructor(context, request) {
        this.context = context;
        this.request = request;
    }

    execute() {
    }

    buildSpeechletResponse(outputText, shouldEndSession, isSSML) {
      let resp = {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
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
