'use strict';

process.env.TZ = 'America/New_York'         // TODO: horrible hack; remove this once moment-timezone is working
let moment = require('moment-timezone')

let Skill = require('./skills/skill');
let AudioSkill = require('./skills/audioSkill');

let PlayMusic = require('./skills/playMusic');
let GetScrumUpdate = require('./skills/getScrumUpdate');
let Help = require('./skills/help');
let GetNextLiveStreamTime = require('./skills/getNextLiveStreamTime');
let GetTheDaily = require('./skills/getTheDaily');
let WhatIs = require('./skills/whatIs');
let PlayLatestService = require('./skills/playLatestService');
let GetLocationServiceTimes = require('./skills/getLocationServiceTimes');

exports.handler = (event, context) => {
    try {
        let skill = transform(event);
        skill.execute();
    }
    catch(error) {
        context.fail(`Exception: ${error}`);
    }
}

function transform (event) {
  if (event.request.intent.name) {
    // is alexa
    let c = eval(event.request.intent.name);
    let skill = new c(context, event.request);
    return skill;
  } else if (typeof event.body === "string") {
    // is apiai/google
    const data = JSON.parse(event.body)
    let c = eval(data.result.action);
    let skill = new c(context, data.request);
    return skill;
  }
}
