'use strict';

let Skill = require('../models/skill');
let https = require('https');

class GetLocationServiceTimes extends Skill {
  constructor(context, request) {
    super(context, request);
  }

  execute() {
    const serviceLocation = this.request.intent.slots.ServiceLocation
    this.context.succeed(this.generateResponse(this.buildSpeechletResponse(`your location is ${serviceLocation}`, true), {}));
  }
}

module.exports = GetLocationServiceTimes;
