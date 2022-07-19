const sendMessage = require('./vonage_test');

const from = "Vonage APIs";
const to = "393313432937";
const text = 'Doctor Dien from UniSalHart: Emergency case! Go to the hospital now!';

sendMessage(from, to, text);
