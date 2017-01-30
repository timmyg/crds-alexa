'use strict';

let Skill = require('./skill');

class GetTheDaily extends Skill{
  constructor(context, request) {
    super(context, request);
  }

  execute() {
    let date = moment(this.request.intent.slots.FromDate.value).format("YYYY-MM-DD")
    this.context.succeed(
      this.generateResponse(
        this.buildSpeechletResponse(`Ima get you the daily from: ${date}`, true),
        {}
      )
    );
  }
}

module.exports = GetTheDaily;
