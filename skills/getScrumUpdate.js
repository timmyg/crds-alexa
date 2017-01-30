'use strict';

let Skill = require('../models/skill');

class GetScrumUpdate extends Skill {
  constructor(context) {
    super(context);
  }

  execute() {
    this.context.succeed(
      this.generateResponse(
        this.buildSpeechletResponse('Some timezone issues were fixed last week and we will be working on developing dynamic conversations and actions today. Nadide wrote the code for todays scrum update', true),
        {}
      )
    );
  }
}

module.exports = GetScrumUpdate;
