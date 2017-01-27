'use strict';

import './skill.js';

var skill;
exports.handler = (event, context) => {
    try {
        if (event.session.new) {
            console.log("NEW SESSION");
        }
    
        skill.type = new Skill(event.request.intent.name);
        skill.execute();
    }
    catch(error) {
        context.fail(`Exception: ${error}`);
    }
}