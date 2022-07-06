// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'AC6cdc70d2914ce68dec5ed69b9b534c18';
const authToken = '3d3ac085c6339007546ad84362304272';
const client = require('twilio')(accountSid, authToken);

function sendMessage() {
    client.messages
        .create({
            body: 'Alert! Patient is in dangerous!',
            from: '+14582178841',
            to: '+393313432937'
        })
        .then(message => console.log(message.sid));
}
