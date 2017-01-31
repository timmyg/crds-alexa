'use strict';

let Skill = require('../skill');
let https = require('https');

class GetLocationServiceTimes extends Skill {
  constructor(context, request) {
    super(context, request);
  }

  execute() {
    const serviceLocation = this.request.intent.slots.ServiceLocation.value
    if (serviceLocation) {
        this.context.succeed(this.generateResponse(this.buildSpeechletResponse(`The hours at ${serviceLocation} are blahblah`, true), {}));
    } else {
        this.context.succeed(this.generateResponse(this.buildSpeechletResponse(`At which location?`, false, false, `At which location do you want service times? We have locations in Oakley, Mason, Oxford, Clifton, West Side, East Side, Columbus, Andover, Florence, Gerogetown, and Richmond`), {intent: 'GetLocationServiceTimes'}));
    }
  }
}

module.exports = GetLocationServiceTimes;
