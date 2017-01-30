'use strict';

<<<<<<< HEAD
process.env.TZ = 'America/New_York'         // TODO: horrible hack; remove this once moment-timezone is working
let moment = require('moment-timezone')

=======
>>>>>>> 77d7ef025b97a028af21c95aa747618791075fa2
let Skill = require('./skill.js');
let AudioSkill = require('./audioSkill.js');

let GetScrumUpdate = require('./getScrumUpdate.js');
let GetNextServiceTime = require('./getNextServiceTime.js');
require('./getTheDaily.js');
let WhatIs = require('./whatIs.js');

let PlayMusic = require('./playMusic.js');
let PlayLatestService = require('./playLatestService.js');

exports.handler = (event, context) => {
    try {
        if (event.session.new) {
            console.log("NEW SESSION");
        }

        let c = eval(event.request.intent.name);
<<<<<<< HEAD
        let skill = new c(context, event.request);
=======
        let skill = new c(context);
>>>>>>> 77d7ef025b97a028af21c95aa747618791075fa2
        skill.execute();
    }
    catch(error) {
        context.fail(`Exception: ${error}`);
    }
}
