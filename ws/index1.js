const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9090 });
var fs = require('fs');
var wstream = fs.createWriteStream('audio.raw');

wss.on('connection', function connection(ws) {

    var count = 0;
    console.log(" - connection ");
    console.log(ws);

    ws.on('close', function close(reason, desc) {
        console.log(' - close : ['+ reason +']['+ desc +'] ');
        wstream.end();
    });

    ws.on('error', function error(message) {
        console.log(' - error : ['+ message +'] ');
    });

    ws.on('message', function incoming(message) {
        count++;
        if (Buffer.isBuffer(message)) {
            if( count < 2 ){
                console.log(" < Binary Frame ");
            }
            wstream.write(message);
        } else {
            console.log(" < Not Binary Frame ");
        }
    });


});

