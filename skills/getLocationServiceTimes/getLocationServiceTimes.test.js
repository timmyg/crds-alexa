var expect = require('chai').expect;
var index = require('../../index');

const context = require('aws-lambda-mock-context');
const ctx = context();

describe("Testing a session with the PlayLatestService", function() {
    var speechResponse = null
    var speechError = null

    before(function(done){
        index.handler({
          "session": {
            "sessionId": "SessionId.5e038803-161c-4f1a-b7f0-333adbe25386",
            "application": {
              "applicationId": "amzn1.ask.skill.80cfa7dc-bfe5-4011-8050-c40571a6c5b9"
            },
            "attributes": {},
            "user": {
              "userId": "amzn1.ask.account.AGK65OZMBWEZBV2DKED2ICGDJ32I2XYKXXJSOA57Q4MQV4YV3FMNUO2GCNGN4WOAZBSUXB2NKQRMIIQVJOBDSAZHBM7DLR5AJTBIFFBNAGAX2SWVRBJWMVNTME7HHDMV64JCIHYGBVWSTVFMIKXBWQNLZ6C3HFKVCSJPOUO7EOFC2VXDVYV2MVXOTRH75V2MDHESB7OJ6GULY6Y"
            },
            "new": true
          },
          "request": {
            "type": "IntentRequest",
            "requestId": "EdwRequestId.df2395dd-dcea-423f-8935-8a0a5e4e3d0c",
            "locale": "en-US",
            "timestamp": "2017-01-31T15:52:46Z",
            "intent": {
              "name": "GetLocationServiceTimes",
              "slots": {
                "ServiceLocation": {
                  "name": "ServiceLocation"
                }
              }
            }
          },
          "version": "1.0"
        }, ctx)

        ctx.Promise
            .then(resp => {
              speechResponse = resp;
              done();
            })
            .catch(err => { speechError = err; done(); })
    })

    describe("The response is structurally correct for Alexa Speech Services", function() {
        it('should not have errored',function() {
            expect(speechError).to.be.null
        })

        it('should have a version', function() {
            expect(speechResponse.version).not.to.be.null
        })

        it('should have a speechlet response', function() {
            expect(speechResponse.response).not.to.be.null
        })

        it("should have a spoken response", () => {
            expect(speechResponse.response.outputSpeech).not.to.be.null
        })

        it("should end the alexa session", function() {
            expect(speechResponse.response.shouldEndSession).not.to.be.null
            expect(speechResponse.response.shouldEndSession).to.be.false
        })
    })
})
