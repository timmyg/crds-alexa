'use strict';

class GetScrumUpdate extends Skill{
  constructor() {
  }

  execute() {
    context.succeed(
      generateResponse(
        buildSpeechletResponse('I now have the ability to stream audio.  You can ask me to play the last service or stream some Crossroads music. Today I plan to learn how to get the next service time and have conversations.', true),
        {}
      )
    );
  } 
}