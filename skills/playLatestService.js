'use strict';

let AudioSkill = require('../outputs/audioSkill');
let https = require('https');

class PlayLatestService extends AudioSkill {
  constructor(context) {
    super(context);
    this.endpoint = "https://www.crossroads.net/proxy/content/api/series";
  }

  execute() {
    https.get(this.endpoint, (response) => {
      let body = "";
      response.on('data', (chunk) => { body += chunk });
      response.on('end', () => {
        let data = JSON.parse(body);
        let messages = data.series[0].messages;
        let latestMessage = messages[messages.length - 1];
        let url = latestMessage.messageAudio.source.filename;
        let description = latestMessage.description.replace(/<(?:.|\n)*?>/gm, '');

        this.context.succeed(this.generateResponse(this.buildAudioResponse(url, `This service is about ${description}`, true), {}));
      });
    });
  }
}

module.exports = PlayLatestService;
