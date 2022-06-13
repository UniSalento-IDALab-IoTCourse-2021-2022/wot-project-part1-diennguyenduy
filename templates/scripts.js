function startup() {
    var socketExample = new WebSocket("ws://localhost:3001");
    socketExample.onopen = function (event) {
        socketExample.send("Text to be sent to the server!");
    };
    socketExample.onmessage = function (event) {
        console.log(event.data);
        document.getElementById("temperature").innerHTML = event.data;
    }
}

