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
    this.endpoint = "https://www.crossroads.net/proxy/content/api/series";
  }

  execute() {
    async.parallel([
      function(callback) {
        var options = { method: 'POST',
          url: 'http://192.168.128.24:8000/api/users/' + mark,
          qs: { api_key: key }
        };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          console.log(body);
          callback(body)
        });
      },
      function(callback) {
        var options = { method: 'POST',
          url: 'http://192.168.128.24:8000/api/users/' + gary,
          qs: { api_key: key }
        };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          console.log(body);
          callback(body)
        });
      }
    ], function(err, results) {
      console.log("ERRR", err);
      console.log("RESULTS", results);
        // optional callback
    });
  }
}

module.exports = BestDrinker;
