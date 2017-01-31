'use strict';

let Skill = require('../models/skill');

class AudioSkill extends Skill {
    constructor(context) {
        super(context)
    }

    buildAudioResponse(url, outputText, shouldEndSession, isSSML) {
        let resp = {
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
        if (isSSML) {
          resp.outputSpeech.type = "SSML";
          resp.outputSpeech.ssml = `<speak>${resp.outputSpeech.text}</speak>`;
        }
        return resp;
    }
}

module.exports = AudioSkill;
