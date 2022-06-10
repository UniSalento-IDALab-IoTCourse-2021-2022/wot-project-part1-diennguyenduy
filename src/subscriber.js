const express = require("express");
const WebSocket = require('ws');
const path = require('path');
const mongodb = require('mongodb');
const mqtt = require('mqtt')
require('dotenv').config()
//const client = mqtt.connect(process.env.BROKER_URL)
//const topicName = 'test/tommyhh/connection'
console.log(process.env);
const client = mqtt.connect(process.env.LOCALHOST)
const topicName = 'aedes/test'

const MongoClient = mongodb.MongoClient;
const uri = 'mongodb://localhost/';
const app = express();

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    ws.send('something');
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());

app.get('/dashboard', async (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

// connect to same client and subscribe to same topic name
client.on('connect', () => {
    // can also accept objects in the form {'topic': qos}
  client.subscribe(topicName, (err, granted) => {
      if(err) {
          console.log(err, 'err');
      }
      console.log(granted, 'granted')
  })
})

// on receive message event, log the message to the console
client.on('message', (topic, message, packet) => {
    console.log(packet, packet.payload.toString());
    if(topic === topicName) {
        var rev_message = JSON.parse(message);
        console.log(rev_message);
        var temperature = rev_message.temperature;
        var timestamp = rev_message.timestamp;
        var sensor = rev_message.sensor;
        async function pushInDb() {
            const client = new MongoClient(uri, {useUnifiedTopology: true});
            try {
                await client.connect();

                const database = client.db("TemperatureDB");
                const temperatureColl = database.collection("temperature");
                // create a document to be inserted
                const doc = {
                    value: temperature,
                    timestamp: timestamp,
                    sensorId: sensor,
                    roomId: 'room1'
                };

                const result = await temperatureColl.insertOne(doc);
                console.log(`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,);
            } finally {
                await client.close();
            }
        }
        pushInDb().catch(console.dir);
        async function pushToClient(){
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(temperature);
                }
            });
        }
        pushToClient().catch(console.dir);
    }
})

client.on("packetsend", (packet) => {
    console.log(packet, 'packet2');
})
