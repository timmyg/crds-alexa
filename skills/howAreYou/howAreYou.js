'use strict';

let Skill = require('../skill');

class HowAreYou extends Skill {
  constructor(context) {
    super(context);
  }

  execute() {
    this.context.succeed(
      this.generateResponse(
        this.buildSpeechletResponse('I am doing great!', true),
        {}
      )
    );
  }
}

module.exports = HowAreYou;
