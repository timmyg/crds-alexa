'use strict';

let Skill = require('../models/skill');
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
        this.context.succeed(this.generateResponse(this.buildSpeechletResponse(`At which location?`, true), {}));
    }
  }
}

module.exports = GetLocationServiceTimes;
