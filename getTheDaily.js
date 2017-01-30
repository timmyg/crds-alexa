'use strict';

let https = require('https')
let moment = require('moment-timezone')
let Skill = require('./skill');

class GetTheDaily extends Skill{
  constructor(context, request) {
    super(context, request);
  }

  execute() {
    let date = moment(this.request.intent.slots.FromDate.value).format("YYYY-MM-DD")
    this.getTheDailyText(date, (text) => {
      this.context.succeed(
        this.generateResponse(
          this.buildSpeechletResponse(text, true),
          {}
        )
      );
    });
  }

  getTheDailyText (date, callback) {
    var body = ''
    console.log('getTheDailyText', date, process.env.MAILCHIMP_API_KEY);
    var options = {
        hostname: 'https://us12.api.mailchimp.com',
        path: `/3.0/campaigns?list_id=f5e8422ab9&sort_field=send_time&sort_dir=DESC&before_send_time=${date}`,
        method: 'GET',
        port: 443,
        auth: `alexa ${process.env.MAILCHIMP_API_KEY}`,
      }
    console.log('options', options);
    https.get(options, (response) => {
        response.on('data', (chunk) => { body += chunk })
        response.on('end', () => {
            var result = JSON.parse(body);
            console.log('result', result);
            var body2 = ''
            https.get(`https://us12.api.mailchimp.com/3.0/campaigns/${result.campaigns[0].id}/content`, (response2) => {
                response2.on('data', (chunk) => { body2 += chunk })
                response2.on('end', () => {
                    var result2 = JSON.parse(body2);
                    console.log('result2', result2);
                    return callback(result2.plain_text);
                });
            });
        });
    });
  }

}

module.exports = GetTheDaily;
