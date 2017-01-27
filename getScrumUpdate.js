'use strict';

let Skill = require('./skill');

class GetScrumUpdate extends Skill{
  constructor(context) {
    super(context);
  }

  execute() {
    this.context.succeed(
      this.generateResponse(
        this.buildSpeechletResponse('I now have the ability to stream audio.  You can ask me to play the last service or stream some Crossroads music. Today I plan to learn how to get the next service time and have conversations.', true),
        {}
      )
    );
  } 
}

module.exports = GetScrumUpdate;