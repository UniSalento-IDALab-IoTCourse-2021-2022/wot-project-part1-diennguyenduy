////const sensorLib = require('node-dht-sensor'); // include existing module called 'node-dht-sensor'
const mqtt = require("mqtt");
require("dotenv").config();
const MLPredict = require('../machine_learning/MLpredict');
const sendMessage = require('../sms_services/vonage_test');


module.exports = function publish(client_id, client_info, client_history) {
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
  // const clientId = "mqttjs_" + Math.random().toString(8).substring(2, 4);
  const clientId = client_id;
  var count = 0;
  // console.log(process.env.LOCALHOST)
  // const client = mqtt.connect(process.env.LOCALHOST, {clientId:clientId, clean:false, reconnectPeriod:1})

  const client = mqtt.connect("mqtt://broker.hivemq.com", {
    clientId: clientId,
    clean: false,
    reconnectPeriod: 1,
  });
  const topicName = "client/heart-failure/" + clientId;


  client.on("connect", function (connack) {
    console.log("Client connected", connack);
  });
  client.on("error", function (error) {
    console.log("Can't connect", error);
  });

  setInterval(async function () {
    console.log('Topic: ', topicName);
    ////var readout = sensorLib.read();
    //var temperature = readout.temperature.toFixed(1)
    ////console.log('Temperature:', temperature + 'C');

    let restingBP = Math.floor(Math.random() * 200); // 0-200
    let cholesterol = Math.floor(Math.random() * 603); //0-603
    let fastingBS = Math.floor(Math.random() * 120 + 80);  // if > 120 mg/dl -> 1 || 0
    let restingECG = Math.floor(Math.random() * 4); // 3 types
    let MaxHR = Math.floor(Math.random() * 142 + 60);  // 60-202

    // Local analyze
    // if (
    //     restingBP < 36 ||
    //     cholesterol > 37.5 ||
    //     fastingBS > 120 ||
    //     restingECG > 150 ||
    //     MaxHR < 95
    // ) {
    //   console.log("Dangerous case!");
    //   //play alert sound & LED turns on
    //   //send message to the doctor via twillio or vonage
    // }

    // Local analyze the data of the patient
    let ExerciseAngina = client_history.ExerciseAngina;
    let OldPeak = client_history.OldPeak;
    let CP = client_history.ChestPainType;
    let ST = client_history.ST_Slope;

    var data = {
      array: [client_info.age, client_info.gender, restingBP,
        cholesterol, fastingBS, MaxHR, ExerciseAngina, OldPeak,
        CP.ASY, CP.ATA, CP.NAP, CP.TA,
        1, 0, 0,
        ST.Down, ST.Flat, ST.Up],
    };

    let predicted = await MLPredict(data);
    count += predicted;
    if(count == 5) {
      let from = "Vonage APIs";
      let to = "393313432937";
      let text = 'Client ' + client_id + ' was predicted 5 times with heart failure. Check now! http://localhost:63342/wot-project-part1-diennguyenduy/Web/Doctor/live_record.html?_ijt=3vcqe2ecj6k4sgigppsufu9muj&_ij_reload=RELOAD_ON_SAVE';

      //sendMessage(from, to, text);
    }

    const body_data = JSON.stringify({
      patient_id: clientId,
      timestamp: new Date().toISOString(),
      restingBP: restingBP,
      cholesterol: cholesterol,
      fastingBS: fastingBS,
      restingECG: restingECG,
      MaxHR: MaxHR,
      predicted: predicted
    });
    console.log(body_data);

    client.publish(
      topicName,
        body_data,
      { qos: 1, retain: true },
      (PacketCallback, err) => {
        if (err) {
          console.log(err, "MQTT publish packet");
        }
      }
    );
  }, 5000);

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
}
