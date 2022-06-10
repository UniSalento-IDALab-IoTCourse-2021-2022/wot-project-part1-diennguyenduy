////const sensorLib = require('node-dht-sensor'); // include existing module called 'node-dht-sensor'
const mqtt = require('mqtt')
require('dotenv').config()

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
const clientId = 'mqttjs_' + Math.random().toString(8).substring(2,4)
// console.log(process.env.BROKER_URL)
// const client = mqtt.connect(process.env.BROKER_URL, {clientId:clientId, clean:false, reconnectPeriod:1})
console.log(process.env.LOCALHOST)
const client = mqtt.connect(process.env.LOCALHOST, {clientId:clientId, clean:false, reconnectPeriod:1})

// console.log(process.env.BROKER_URL, 'client', clientId)

const topicName = 'aedes/test'

client.on("connect",function(connack){
    console.log("Client connected", connack);
});
client.on("error",function(error){
    console.log("Can't connect", error);
});


setInterval(function(){
    ////var readout = sensorLib.read();
    ////console.log('Temperature:', readout.temperature.toFixed(1) + 'C');
    ////console.log('Humidity: ', readout.humidity.toFixed(1) + '%');
    const data = JSON.stringify({
        'sensor': 'ID1',
        'timestamp': new Date().toISOString(),
        'temperature': 23
    })
    console.log(data);
    client.publish(topicName, data, {qos: 1, retain: true}, (PacketCallback, err) => {
        if(err) {
            console.log(err, 'MQTT publish packet')
        }
    })
}, 3000)


 client.on("error", function(err) {
     console.log("Error: " + err)
     if(err.code == "ENOTFOUND") {
         console.log("Network error, make sure you have an active internet connection")
     }
 })

 client.on("close", function() {
     console.log("Connection closed by client")
 })

 client.on("reconnect", function() {
     console.log("Client trying a reconnection")
 })

 client.on("offline", function() {
     console.log("Client is currently offline")
 })
