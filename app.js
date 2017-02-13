'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
var admin = require("firebase-admin");
var network = require('network');
var iplocation = require('iplocation')

const app = express()

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', function (req, res) {
    res.send('Hi, I am a bot!')
})

var verify = process.env.VERIFY_VALUE

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === verify) {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

admin.initializeApp({
    credential: admin.credential.cert(process.env.PATH_AUTH),
    databaseURL: "https://fiap-iot-bot.firebaseio.com"
});

app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    console.log(messaging_events);
    //   var rpio = require('rpio');

    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id

        if (event.message && event.message.text) {
            let text = event.message.text
            if (text == "turnon") {
                var unix = Math.round(+new Date() / 1000);

                //	       rpio.open(12, rpio.OUTPUT, rpio.LOW);
                //             rpio.write(12, rpio.HIGH);

                sendTextMessage(sender, "Turning on the light 💡💡")
                sendToDB(sender, text, unix)
            }
            else if (text == "turnoff") {
                var unix = Math.round(+new Date() / 1000);

                //            rpio.write(12, rpio.LOW);
                sendTextMessage(sender, "Turning off the lights 🔌")
                sendToDB(sender, text, unix)

            }
            else {
                var unix = Math.round(+new Date() / 1000);
                sendToDB(sender, "invalid", unix)
                sendTextMessage(sender, text.substring(0, 200) + " " + "... hmm, I am only prepared to turnon or turnoff!")
            }
        }
    }
    res.sendStatus(200)
})

var token = process.env.TOKEN_VALUE

function sendTextMessage(sender, text) {
    let messageData = { text: text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendToDB(sender, text, unix) {
    var db = admin.database();
    var ref = db.ref("server/message");
    var msgRef = ref.child("msg");
    return network.get_public_ip(function (err, ip) {
            iplocation(ip, function (error, res) {
                var req = {
                    recipient: { id: sender },
                    message: text,
                    timestamp: unix,
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude
                    },
                };
                msgRef.push().set(req);
                return req;
            })
        });
}

// function geoIP() {
    
// }

app.listen(app.get('port'), function () {
    console.log('running on port', app.get('port'))
})
