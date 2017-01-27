'use strict';

let Skill = require('./skill');
let https = require('https');

class WhatIs extends Skill{
  constructor(context) {
    this.endpoint = "https://www.crossroads.net/proxy/content//api/SiteConfig/1";
    super(context);
  }

  execute() {
    https.get(endpoint, (response) => {
        let body = "";
        response.on('data', (chunk) => { body += chunk });
        response.on('end', () => {
            let data = JSON.parse(body);
            let responseText = data.siteConfig.rSS_iTunesSummary;
            context.succeed(generateResponse(buildSpeechletResponse(responseText, true), {}));
        });
    }); 
  }
}

module.exports = WhatIs;