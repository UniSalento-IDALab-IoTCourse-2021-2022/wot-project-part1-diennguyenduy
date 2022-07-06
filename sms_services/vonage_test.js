const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: "e697976b",
    apiSecret: "eMWFakmoB4l5KHfk"
})

const from = "Vonage APIs"
const to = "393313432937"
const text = 'Patient 17021215 - Alert! Emergency case'

vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
})
