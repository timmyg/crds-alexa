'use strict';

let Skill = require('./skill');

class GetScrumUpdate extends Skill{
  constructor(context) {
    super(context);
  }

  execute() {
    this.context.succeed(
      this.generateResponse(
        this.buildSpeechletResponse('Do you want some coffee?', true),
        {}
      )
    );
  } 
}

module.exports = GetScrumUpdate;