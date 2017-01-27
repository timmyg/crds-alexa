'use strict';

class Skill {
    constructor(context) {
        this.context = context;
    }
    
    execute() {
    }
    
    buildSpeechletResponse(outputText, shouldEndSession) {
        return {
            outputSpeech: {
                type: "PlainText",
                text: outputText
            },
            shouldEndSession: shouldEndSession
        }
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