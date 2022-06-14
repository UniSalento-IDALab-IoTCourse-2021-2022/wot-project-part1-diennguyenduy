function startup() {
    var socketExample = new WebSocket("ws://localhost:3001");
    socketExample.onopen = function (event) {
        socketExample.send("Text to be sent to the server!");
    };
    socketExample.onmessage = function (event) {
        const object = JSON.parse(event.data);
        console.log('Websocket received: ', object);
    }
}
