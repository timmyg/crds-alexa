'use strict';

let https = require('https')
let moment = require('moment-timezone')
var request = require('request');
let cheerio = require('cheerio')
let Skill = require('../skill');

class GetTheDaily extends Skill {
  constructor(context, request) {
    super(context, request);
  }

  execute() {
    const now = moment()
    let date = moment(this.request.intent.slots.FromDate.value).hour(now.hour()).minute(now.minute()).format()
    this.getTheDailyText(date, (text) => {
      this.context.succeed(
        this.generateResponse(
          this.buildSpeechletResponse(text, true, true),
          {}
        )
      );
    });
  }

  format (text) {
    // this may or may not be where all the footer 'gibberish' starts in the email
    // that we need to pull out
    const footerStart = 'Get the most out of The Daily';
    text = text.replace(/\n/g, '<break time="1s"/>');
    // remove url's from string
    text = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    return text.slice(0, text.indexOf(footerStart))
  }

  getTheDailyText (date, callback) {
    var context = this;
    var options = {
      method: 'GET',
      json: true,
      auth: {
        user: 'alexa',
        pass: process.env.MAILCHIMP_API_KEY
      },
      url: 'https://us12.api.mailchimp.com/3.0/campaigns',
      qs: { list_id: 'f5e8422ab9',
         sort_field: 'send_time',
         sort_dir: 'DESC',
         before_send_time: date }
       };

    request(options, function (error, response, body) {
      options = {
        method: 'GET',
        json: true,
        auth: {
          user: 'alexa',
          pass: process.env.MAILCHIMP_API_KEY
        },
        url: `https://us12.api.mailchimp.com/3.0/campaigns/${body.campaigns[0].id}/content`
       };
      request(options, function (error2, response12, body2) {
        return callback(context.format(body2.plain_text));
      });
    });

  }

}

module.exports = GetTheDaily;
