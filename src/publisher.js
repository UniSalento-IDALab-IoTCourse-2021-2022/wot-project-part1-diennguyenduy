////const sensorLib = require('node-dht-sensor'); // include existing module called 'node-dht-sensor'
const mqtt = require("mqtt");
require("dotenv").config();

//// Setup sensor, exit if failed
//// var sensorType = 11; // 11 for DHT11, 22 for DHT22 and AM2302
//// var sensorPin = 4; // The GPIO pin number for sensor signal
//// if (!sensorLib.initialize(sensorType, sensorPin))
//// {
////     //print a warning message in the console
////     console.warn('Failed to initialize sensor');
////     process.exit(1);
//// }

//the client id is used by the MQTT broker to keep track of clients and and their // state
const clientId = "mqttjs_" + Math.random().toString(8).substring(2, 4);
// console.log(process.env.LOCALHOST)
// const client = mqtt.connect(process.env.LOCALHOST, {clientId:clientId, clean:false, reconnectPeriod:1})

const client = mqtt.connect("mqtt://broker.hivemq.com", {
  clientId: clientId,
  clean: false,
  reconnectPeriod: 1,
});
const topicName = "aedes/test";

client.on("connect", function (connack) {
  console.log("Client connected", connack);
});
client.on("error", function (error) {
  console.log("Can't connect", error);
});

setInterval(function () {
  ////var readout = sensorLib.read();
  //var temperature = readout.temperature.toFixed(1)
  ////console.log('Temperature:', temperature + 'C');

  let temperature = (Math.random() * 5 + 35).toFixed(1); //random in range (35,40)
  let heart_rate = Math.floor(Math.random() * 100 + 30); //random in range (30,130)
  let oxygen = (Math.random() * 100).toFixed(2); //random in range (0,100)%
  if (
    temperature < 36 ||
    temperature > 37.5 ||
    heart_rate < 60 ||
    heart_rate > 100 ||
    oxygen < 95
  ) {
    console.log("Dangerous case!");
    //play alert sound & LED turns on
    //send message to the doctor & patient's family via twillio or vonage
  }

  const data = JSON.stringify({
    patient_id: clientId,
    timestamp: new Date().toISOString(),
    temperature: temperature,
    pulse_rate: heart_rate,
    oxygen_level: oxygen
  });
  console.log(data);
  client.publish(
    topicName,
    data,
    { qos: 1, retain: true },
    (PacketCallback, err) => {
      if (err) {
        console.log(err, "MQTT publish packet");
      }
    }
  );
}, 3000);

client.on("error", function (err) {
  console.log("Error: " + err);
  if (err.code == "ENOTFOUND") {
    console.log(
      "Network error, make sure you have an active internet connection"
    );
  }
});

client.on("close", function () {
  console.log("Connection closed by client");
});

client.on("reconnect", function () {
  console.log("Client trying a reconnection");
});

client.on("offline", function () {
  console.log("Client is currently offline");
});
