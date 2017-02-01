'use strict';

let AudioSkill = require('../audioSkill');
let https = require('https');

class PlayMusic extends AudioSkill {
  constructor(context) {
    super(context);
    this.endpoint = "https://www.crossroads.net/proxy/content/api/singleMedia";
  }

  execute() {
    // https.get(this.endpoint, (response) => {
    //   let body = "";
    //   response.on('data', (chunk) => { body += chunk });
    //   response.on('end', () => {
    //     let media = JSON.parse(body).singleMedia;
    //     let mediaAudio = media.filter(function( obj ) {
    //       return obj.className == "Music";
    //     });
    //
    //     let randomNumber = Math.floor(Math.random() * mediaAudio.length);
    //     let randomAudio = mediaAudio[randomNumber];
    //
    //     console.log('play audio', randomAudio.source.filename, `Playing ${randomAudio.title}`, true)
    //     this.context.succeed(this.generateResponse(this.buildAudioResponse(randomAudio.source.filename, `Playing ${randomAudio.title}`, true, false), {}));
    //   });
    // });
    const url = `https://s3.amazonaws.com/crds-cms-uploads/media/music/02-Heaven-Fall-Down.mp3`;
    this.context.succeed(this.generateResponse(this.buildAudioResponse(url, `Playing Heaven Fall Down`, true, false), {}));

  }
}

module.exports = PlayMusic;
