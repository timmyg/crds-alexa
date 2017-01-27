'use strict';

let Skill = require('./skill');

class Hero extends Skill{
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

module.exports = Hero;