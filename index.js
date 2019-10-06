//https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup
'user strict';

const
    express = require('express');
bodyParser = require('body-parser');
app = express().use(bodyParser.json());

app.post('/webhook', (req, res) => {
    let body = req.body;

    if (body.object == 'page') {
        body.entry.forEach(function(entry) {
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });
        res.status(200).send('event received')
    } else {
        res.sendStatus(404);
    }

});

app.get('/webhook', (req, res) => {
    let VERIFY_TOKEN = "random_verify_token";

    let mode = req.query['hub.mode'];
    let token = req.query['hub.VERIFY_TOKEN'];
    let challenge = req.query['hub.challenge'];

    if (token && mode) {
        if (token === VERIFY_TOKEN && token === 'subscribe') {
            console.log('WEBHOOK VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});