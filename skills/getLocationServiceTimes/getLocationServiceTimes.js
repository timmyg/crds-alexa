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
    if (serviceLocation == 'East Side' || serviceLocation == 'Columbus') {
      return `${serviceLocation} is not yet open. Check back soon!`
    }
    let str = [`Service times at ${serviceLocation} are`];
    switch (serviceLocation) {
      case 'Oakley':
        str.push('Saturdays at 4:30 and 6:15pm and Sundays at 8:30am, 10:05am & 11:45am');
        break;
      case 'Mason':
        str.push('Saturdays at 5pm and Sundays at 9:15am, 11am');
        break;
      case 'Oxford':
        str.push('Sundays at 11am');
        break;
      case 'Clifton':
        str.push('Sundays at 11am');
        break;
      case 'West Side':
        str.push('Saturdays at 5:30pm and Sundays at 9:15am & 11am');
        break;
      case 'Andover':
        str.push('Sundays at 9:15am & 11am');
        break;
      case 'Florence':
        str.push('Saturdays at 5:30 and Sundays at 9:30am & 11:30am');
        break;
      case 'Gerogetown':
        str.push('Sundays at 9:15am & 11:00am');
        break;
      case 'Richmond':
        str.push('Sundays at 9:15am & 11:00am');
        break;
    }
    return str.join(' ');
  }
}

module.exports = GetLocationServiceTimes;
