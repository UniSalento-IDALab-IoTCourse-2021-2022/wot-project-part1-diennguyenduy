// const spawn = require('child_process').spawn;
//
// const process = spawn('python', ['./test.py']);
//
// process.stdout.on('data', data => {
//    console.log(data.toString());
// });
var request = require("request-promise");

async function arraysum() {
   // This variable contains the data
   // you want to send
   var data = {
      array: [23, 1, 150, 0, 0, 150, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
   };

   var options = {
      method: "POST",

      // http:flaskserverurl:port/route
      uri: "http://127.0.0.1:5000/predict",
      body: data,

      // Automatically stringifies
      // the body to JSON
      json: true,
   };

   var sendrequest = await request(options)
       // The parsedBody contains the data
       // sent back from the Flask server
       .then(function (parsedBody) {
          console.log(parsedBody);

          // You can do something with
          // returned data
          let result;
          result = parsedBody["result"];
          console.log("Predicted result: ", result);
       })
       .catch(function (err) {
          console.log(err);
       });
}

arraysum();
