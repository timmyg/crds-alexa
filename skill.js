'use strict';

import './getScrumUpdate';

export default class Skill {
    constructor() {
    }
    
    execute() {
    }
    
    static execute(type) {
        let c = eval(type);
        let skill = new c();
        skill.execute();
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