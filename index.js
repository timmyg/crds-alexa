'use strict';

let Skill = require('./skill.js');
let GetScrumUpdate = require('./getScrumUpdate.js');

exports.handler = (event, context) => {
    try {
        if (event.session.new) {
            console.log("NEW SESSION");
        }
    
        let c = eval(event.request.intent.name);
        let skill = new c(context);
        skill.execute();
    }
    catch(error) {
        context.fail(`Exception: ${error}`);
    }
}