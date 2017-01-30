'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index Route
app.get('/', function (req, res) {
    res.send('Olá, Eu sou um bot')
})

app.get('/privacy/', function (req, res) {
    res.send('Olá, essa é minha política de privacidade.')
    res.sendStatus(200)
})

var verify = process.env.VERIFY_VALUE
// para verificacao do Facebook
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === verify) {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    var rpio = require('rpio');

    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id
        if (event.message && event.message.text) {
            let text = event.message.text
            if(text == "ligar"){
		rpio.open(12, rpio.OUTPUT, rpio.LOW);
                sendTextMessage(sender, "Ligando a lampada 💡💡")
		console.log("LED ligado")
        	rpio.write(12, rpio.HIGH);
            }
            else if(text == "desligar"){
        	rpio.write(12, rpio.LOW);
                sendTextMessage(sender, "Desligando a lampada 🔌")
	    }
            else {
                sendTextMessage(sender, "Você me disse " + text.substring(0, 200) + " " + "... hmm, não entendi...")
            }
           // sendTextMessage(sender, "heroku: " + text.substring(0, 200))
        }
    }
    res.sendStatus(200)
})

var token = process.env.TOKEN_VALUE

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
