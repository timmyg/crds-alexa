'use strict';

let Skill = require('../skill');

class GetScrumUpdate extends Skill {
  constructor(context) {
    super(context);
  }

  execute() {
    this.context.succeed(
      this.generateResponse(
        this.buildSpeechletResponse('Our scrum update today is that we ate pizza.', true),
        {}
      )
    );
  }
}

module.exports = GetScrumUpdate;
