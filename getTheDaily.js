'use strict';

let https = require('https')
let moment = require('moment-timezone')
var request = require('request');
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
    var options = {
      method: 'GET',
      url: 'https://us12.api.mailchimp.com/3.0/campaigns',
      qs:
       { list_id: 'f5e8422ab9',
         sort_field: 'send_time',
         sort_dir: 'DESC',
         before_send_time: '2017-01-27T15:41:36 00:00.' },
      headers:
       { 'postman-token': '720c5f32-82a3-9ff1-91d9-f62642dec508',
         'cache-control': 'no-cache',
         authorization: 'Basic YWxleGE6MzYzZDFjN2MxMDZiZjc3ZmU5OTViYTVhNmU3MTgwNmQtdXMxMg==' } };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });

  }
  // getTheDailyText (date, callback) {
  //   var body = ''
  //   console.log('getTheDailyText', date, process.env.MAILCHIMP_API_KEY);
  //   var options = {
  //       hostname: 'https://us12.api.mailchimp.com',
  //       path: `/3.0/campaigns?list_id=f5e8422ab9&sort_field=send_time&sort_dir=DESC&before_send_time=${date}`,
  //       method: 'GET',
  //       auth: {'alexa': `${process.env.MAILCHIMP_API_KEY}`},
  //     }
  //   console.log('options', options);
  //   var req = https.request(options, (response) => {
  //       response.on('data', (chunk) => { body += chunk })
  //       response.on('end', () => {
  //           var result = JSON.parse(body);
  //           console.log('result', result);
  //           var body2 = ''
  //           https.get(`https://us12.api.mailchimp.com/3.0/campaigns/${result.campaigns[0].id}/content`, (response2) => {
  //               response2.on('data', (chunk) => { body2 += chunk })
  //               response2.on('end', () => {
  //                   var result2 = JSON.parse(body2);
  //                   console.log('result2', result2);
  //                   return callback(result2.plain_text);
  //               });
  //           });
  //       });
  //   });
  //   console.log(req);
  //   req.end();
  // }

}

module.exports = GetTheDaily;
