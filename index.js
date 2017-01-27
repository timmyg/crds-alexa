'use strict';

import './skill.js';

var skill;
exports.handler = (event, context) => {
    try {
        if (event.session.new) {
            console.log("NEW SESSION");
        }
    
        Skill.execute(event.request.intent.name);
    }
    catch(error) {
        context.fail(`Exception: ${error}`);
    }
}