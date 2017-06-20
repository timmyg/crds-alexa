'use strict';

process.env.TZ = 'America/New_York'         // TODO: horrible hack; remove this once moment-timezone is working
let moment = require('moment-timezone')

let Skill = require('./skills/skill');
let AudioSkill = require('./skills/audioSkill');

let PlayMusic = require('./skills/playMusic');
let GetScrumUpdate = require('./skills/getScrumUpdate');
let Help = require('./skills/help');
let GetNextLiveStreamTime = require('./skills/getNextLiveStreamTime');
let HowAreYou = require('./skills/howAreYou');
let GetTheDaily = require('./skills/getTheDaily');
let PlayLatestService = require('./skills/playLatestService');
let GetLocationServiceTimes = require('./skills/getLocationServiceTimes');

exports.handler = (event, context) => {
    try {
        if (event.session.new) {
            console.log("NEW SESSION");
        }

        let c = eval(event.request.intent.name);
        let skill = new c(context, event.request);
        skill.execute();
    }
    catch(error) {
        context.fail(`Exception: ${error}`);
    }
}
