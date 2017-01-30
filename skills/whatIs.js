'use strict';

let Skill = require('../models/skill');
let https = require('https');

class WhatIs extends Skill {
  constructor(context) {
    super(context);
    this.endpoint = "https://www.crossroads.net/proxy/content//api/SiteConfig/1";
  }

  execute() {
    https.get(this.endpoint, (response) => {
        let body = "";
        response.on('data', (chunk) => { body += chunk });
        response.on('end', () => {
            let data = JSON.parse(body);
            let responseText = data.siteConfig.rSS_iTunesSummary;
            this.context.succeed(this.generateResponse(this.buildSpeechletResponse(responseText, true), {}));
        });
    });
  }
}

module.exports = WhatIs;
