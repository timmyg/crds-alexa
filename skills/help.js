'use strict';

let Skill = require('../models/skill');

class Help extends Skill {
  constructor(context) {
    super(context);
  }

  execute() {
    this.context.succeed(
      this.generateResponse(
        this.buildSpeechletResponse('I can stream last week\'s service, read you The Daily, play some worship music, or tell you when the next Live Stream is.', true),
        {}
      )
    );
  }
}

module.exports = Help;
