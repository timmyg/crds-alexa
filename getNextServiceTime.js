'use strict';

let https = require('https')
let moment = require('moment-timezone')
let Skill = require('./skill');

let EVENT_TIME_ZONE = 'America/New_York';

class Event {
    constructor(start, title) {
        this.start = start;
        this.title = title;
    }
}

class GetNextServiceTime extends Skill {
    constructor(context) {
        super(context);
    }

    execute() {
        this.getText((text) => {
            this.context.succeed(this.generateResponse(this.buildSpeechletResponse(text, true), {}));
        });
    }

    // Call streamspot endpoint to retrieve the next scheduled event:
    //    https://api.streamspot.com/broadcaster/crossr4915/events
    // Note: requires a custom request header x-API-Key
    //
    // Based on:
    //    crds-angular\crossroads.net\app\live_stream\services\streamspot.service.js
    //    crds-angular\crossroads.net\app\live_stream\services\countdown.service.js
    //
    // TODO: This is pulling the ENTIRE event list (currently 900+) and then filtering
    // down to 2 events.  Ideally the streamspot service would allow us to pass
    // parameters to filter/limit the results.
    getText(callback) {
        var options = {
            hostname: 'api.streamspot.com',
            port: 443,
            path: '/broadcaster/crossr4915/events',
            method: 'GET',
            headers: {
                'Host': 'api.streamspot.com',
                'x-API-Key': '82437b4d-4e38-42e2-83b6-148fcfaf36fb'
            }
        };

        var body = ''

        https.get(options, (response) => {
            response.on('data', (chunk) => { body += chunk })
            response.on('end', () => {
                var result = JSON.parse(body);

                if (result.success === true) {
                    var now = moment.now();

                    var currentEvent = null;
                    var nextEvent = null;

                    result.data.events.forEach(e => {
                        var start = moment.tz(e.start, EVENT_TIME_ZONE);
                        var end = moment.tz(e.end, EVENT_TIME_ZONE);
                        var title = e.title;

                        if (start <= now && end > now) {
                            // event currently in progress
                            if (currentEvent == null)
                                currentEvent = new Event(start, title);
                        } else if (start > now) {
                            // future event closest to now
                            if (nextEvent == null || start < nextEvent.start)
                                nextEvent = new Event(start, title);
                        }
                    });
                }

                var sentences = [];

                if (currentEvent)
                    sentences.push('A service is currently in progress');

                if (nextEvent) {
                    let eventTime = this.getEventStartTime(nextEvent);
                    let eventTimeString = moment(eventTime).calendar(null, { sameElse: 'dddd MMMM Do [at] h:m A' });
                    sentences.push('The next service is ' + eventTimeString);
                }

                if (sentences.length == 0)
                    sentences.push("I couldn't find any upcoming events");

                callback(sentences.join('. '));
            });
        });
    }

    // event.start time provided by streamspot is the time that the live streaming begins,
    // which is typically 10 minutes or so BEFORE the true start time.  The event.title field
    // typically contains text like "Saturday 4:30 pm", so we can extract the time portion
    // from the title then replace just the time portion of event.start to get the true
    // date/time.  If we can't get the time from the title, then we'll fallback to using the
    // original event.start as is (i.e., off by 10 minutes)
    getEventStartTime(event) {
        var start = event.start;

        if (event.title) {
            try {
                var titleTime = moment.tz(event.title, 'h:m a', EVENT_TIME_ZONE)
                if (titleTime.isValid())
                    start = start.set({ hour: titleTime.hour(), minute: titleTime.minute() }); 
            } catch (e) {
                // ignore exception, fallback to original event.start
            }
        }

        return start;
    }
}

module.exports = GetNextServiceTime;
