'use strict';

let Skill = require('./skill');

class GetScrumUpdate extends Skill{
  constructor(context) {
    super(context);
  }

  execute() {
    this.context.succeed(
      this.generateResponse(
        this.buildSpeechletResponse('Jon Baker is your hero.', true),
        {}
      )
    );
  } 
}

module.exports = GetScrumUpdate;