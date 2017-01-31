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
        const timesString = this.getTimesString(serviceLocation);
        this.context.succeed(this.generateResponse(this.buildSpeechletResponse(timesString, true), {}));
    } else {
        this.context.succeed(this.generateResponse(this.buildSpeechletResponse(`At which location?`, false, false, `At which location do you want service times? We have locations in Oakley, Mason, Oxford, Clifton, West Side, East Side, Columbus, Andover, Florence, Gerogetown, and Richmond`), {intent: 'GetLocationServiceTimes'}));
    }
  }

  getTimesString(serviceLocation) {
    let str = [`Service times at ${serviceLocation} are`];
    switch (serviceLocation) {
      case 'Oakley':
        str.push('Saturdays at 4:30 and 6:15pm and Sundays at 8:30am, 10:05am & 11:45am');
        break;
    }
    return str.join(' ');
  }
}

module.exports = GetLocationServiceTimes;
