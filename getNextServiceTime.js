'use strict';

let Skill = require('./skill');
let https = require('https');

class GetNextServiceTime extends Skill{
  constructor(context) {
    this.endpoint = "https://www.crossroads.net/proxy/content/api/SystemPage/?StateName=live;"
    super(context);
  }

  execute() {
    https.get(endpoint, (response) => {
        let body = ""
        response.on('data', (chunk) => { body += chunk });
        response.on('end', () => {
            let data = JSON.parse(body)
            let streamTimes = data.systemPages[0].description
            context.succeed(generateResponse(buildSpeechletResponse(streamTimes, true), {}));
        });
    }); 
  }
}

module.exports = GetNextServiceTime;