const spawn = require('child_process').spawn;

const process = spawn('python', ['./test.py']);

process.stdout.on('data', data => {
   console.log(data.toString());
});