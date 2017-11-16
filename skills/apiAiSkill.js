'use strict';
let Skill = require('./skill');

class ApiAiSkill extends Skill {
    constructor(context, request) {
        super(context, request);
    }

    buildSpeechletResponse(outputText, shouldEndSession) {
        return JSON.stringify({
            speech: outputText,
            displayText: outputText,
            source: 'apiai-webhook-sample'
        });
    }

    generateResponse(speechletResponse, sessionAttributes) {
        return {
            "statusCode": 200,
            "headers": {},
            "body": speechletResponse
        }
    }
}

module.exports = ApiAiSkill;
