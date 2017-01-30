'use strict';

let Skill = require('./skill');

class getTheDaily extends Skill{
  constructor(context, request) {
    super(context, request);
  }

  execute() {
    this.context.succeed(
      this.generateResponse(
        this.buildSpeechletResponse(`Ima get you the daily from: ${this.request.intent.slots.FromDate.value}`, true),
        {}
      )
    );
  }
}

module.exports = GetScrumUpdate;
