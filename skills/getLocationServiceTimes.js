'use strict';

let Skill = require('../models/skill');
let https = require('https');

class GetLocationServiceTimes extends Skill {
  constructor(context) {
    super(context);
    this.endpoint = "https://www.crossroads.net/proxy/content//api/SiteConfig/1";
  }

  execute() {
    const serviceLocation = this.request.intent.slots.ServiceLocation
    this.context.succeed(this.generateResponse(this.buildSpeechletResponse(`your location is ${serviceLocation}`, true), {}));
  }
}

module.exports = GetLocationServiceTimes;
