'use strict';

let Skill = require('./skill');

class GetScrumUpdate extends Skill{
  constructor(context) {
    super(context);
  }

  execute() {
    this.context.succeed(
      this.generateResponse(
        this.buildSpeechletResponse('Some timezone issues were fixed last week and we will be working on developing dynamic conversations and actions today. Nadide wrote the code for todays scrum update. Wohooo!', true),
        {}
      )
    );
  } 
}

module.exports = GetScrumUpdate;