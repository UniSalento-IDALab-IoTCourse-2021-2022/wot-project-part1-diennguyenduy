'use strict';
const fs = require('fs');
const publish = require('./publish');

let raw_data = fs.readFileSync('../database/client.json');
let client = JSON.parse(raw_data);

let client_info = client.information;
let client_history = client.historical;

publish(client.id, client_info, client_history);
