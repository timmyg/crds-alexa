'use strict';

let Skill = require('./skill');

class GetTheDaily extends Skill{
  constructor(context, request) {
    super(context, request);
  }

  execute() {
    let date = moment(this.request.intent.slots.FromDate.value).format("YYYY-MM-DD")
    this.context.succeed(
      this.generateResponse(
        this.getTheDailyText(date, (text) =>
          this.buildSpeechletResponse(text, true),
          {}
        )
      )
    );
  }

  getTheDailyText = (date, callback) => {
    var body = ''
    https.get(`https://us12.api.mailchimp.com/3.0/campaigns?list_id=f5e8422ab9&sort_field=send_time&sort_dir=DESC&before_send_time=${date}`, (response) => {
        response.on('data', (chunk) => { body += chunk })
        response.on('end', () => {
            var result = JSON.parse(body);
            var body2 = ''
            https.get(`https://us12.api.mailchimp.com/3.0/campaigns/${result.campaigns[0].id}/content`, (response2) => {
                response2.on('data', (chunk) => { body2 += chunk })
                response2.on('end', () => {
                    var result2 = JSON.parse(body2);
                    callback(result2.plain_text);
                });
            });
        });
    });
  }

}

module.exports = GetTheDaily;
