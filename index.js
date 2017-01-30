'use strict';

process.env.TZ = 'America/New_York'         // TODO: horrible hack; remove this once moment-timezone is working
let moment = require('moment-timezone')
console.log('moment timezone...', moment().tz("America/Los_Angeles").format())
 
let Skill = require('./skill.js');
let AudioSkill = require('./audioSkill.js');

let GetScrumUpdate = require('./getScrumUpdate.js');
let GetNextServiceTime = require('./getNextServiceTime.js');
let WhatIs = require('./whatIs.js');

let PlayMusic = require('./playMusic.js');
let PlayLatestService = require('./playLatestService.js');

exports.handler = (event, context) => {
    try {
        if (event.session.new) {
            console.log("NEW SESSION");
        }

        console.log('hi');
        let c = eval(event.request.intent.name);
        console.log('hi');
        let skill = new c(context);
        console.log('hi');
        skill.execute();
    }
    catch(error) {
        context.fail(`Exception: ${error}`);
    }
}
