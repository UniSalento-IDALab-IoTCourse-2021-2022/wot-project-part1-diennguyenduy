var request = require("request-promise");


module.exports = async function MLPredict(data) {
    let prediction;
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

          // Do something with returned data
           prediction = parsedBody["result"];
          // console.log(prediction);
       })
       .catch(function (err) {
          console.log(err);
       });

   return prediction;
}
