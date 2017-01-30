'use strict';

let Skill = require('../models/skill');

class AudioSkill extends Skill {
    constructor(context) {
        super(context)
    }

    buildAudioResponse(url, outputText, shouldEndSession) {
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
}

module.exports = AudioSkill;
