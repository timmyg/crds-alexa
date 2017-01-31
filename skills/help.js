'use strict';

let Skill = require('./skill');

class Help extends Skill {
  constructor(context) {
    super(context);
  }

  execute() {
    this.context.succeed(
      this.generateResponse(
        this.buildSpeechletResponse('Welcome to the Crossroads Alexa skill. You can ask me to stream last week\'s service, read you The Daily, tell you when the next live stream is, or I can even play you some worship jams.', true),
        {}
      )
    );
  }
}

module.exports = Help;
