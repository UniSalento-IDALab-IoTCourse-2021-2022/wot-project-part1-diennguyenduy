const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: "e697976b",
    apiSecret: "eMWFakmoB4l5KHfk"
})



module.exports = function sendMessage(from, to, text) {
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}
