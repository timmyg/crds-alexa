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
      console.log(body, body.campaigns, response.statusCode)





      options = {
        method: 'GET',
        url: `https://us12.api.mailchimp.com/3.0/campaigns/${body.campaigns[0].id}/content`,
        headers:
         {
           authorization: 'Basic YWxleGE6MzYzZDFjN2MxMDZiZjc3ZmU5OTViYTVhNmU3MTgwNmQtdXMxMg=='
         }
       };

      request(options, function (error2, response12, body2) {
        console.log(body2);
        return callback(body2.plain_text);
      });












    });

  }

}

module.exports = GetTheDaily;
