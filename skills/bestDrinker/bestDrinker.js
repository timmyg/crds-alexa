'use strict';

let Skill = require('../skill');
let request = require('request');
let async = require('async');
const key = 'bcb2e49b69c26e636aa1cd53a99a1762';
const mark = 'mwehby';
const gary = 'ghoward';

class BestDrinker extends Skill {
  constructor(context) {
    super(context);
  }

  execute() {
    console.log("EXECUTING BEST DRINKER")
    var self = this;
    async.parallel([
      function(callback) {
        var options = { method: 'GET',
          url: 'http://callibrity-khqqrnjcpq.dynamic-m.com:8000/api/users/' + mark+ '/drinks',
          qs: { api_key: key }
        };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          console.log(body);
          callback(null, body)
        });
      },
      function(callback) {
        var options = { method: 'GET',
          url: 'http://callibrity-khqqrnjcpq.dynamic-m.com:8000/api/users/' + gary + '/drinks',
          qs: { api_key: key }
        };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          console.log(body);
          callback(null, body)
        });
      }
    ], function(err, results) {
      console.log("ERRR", err);
      console.log("RESULTS", results);
      // console.log(results[0].objects.length)
      // console.log(results[1].objects.length)
        // optional callback
      let response = '';
      response = response.concat('Mark has had ' + JSON.parse(results[0]).objects.length + ' beers and ')
      response = response.concat('Gary has had ' + JSON.parse(results[1]).objects.length + ' beers')
      self.context.succeed(
        self.generateResponse(
          self.buildSpeechletResponse(response, true),
          {}
        )
      );
    });
  }
}

module.exports = BestDrinker;
