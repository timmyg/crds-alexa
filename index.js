'use strict';

process.env.TZ = 'America/New_York'         // TODO: horrible hack; remove this once moment-timezone is working
let moment = require('moment-timezone')

let Skill = require('./skills/skill.js');

let AudioSkill = require('./outputs/audioSkill.js');
let PlayMusic = require('./outputs/playMusic.js');

let GetScrumUpdate = require('./skills/getScrumUpdate.js');
let GetNextServiceTime = require('./skills/getNextServiceTime.js');
let GetTheDaily = require('./skills/getTheDaily.js');
let WhatIs = require('./skills/whatIs.js');
let PlayLatestService = require('./skills/playLatestService.js');

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
