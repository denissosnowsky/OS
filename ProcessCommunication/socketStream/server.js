const net = require('net');

const user = {name: 'Den', age: '23'};

console.log('Server Process ID is: ', process.pid);

const server = net.createServer(socket => {
    console.log('Connected to: ', socket.localAddress);
    socket.write(JSON.stringify(user));
    socket.on('data', data => {
        const message = data.toString();
        console.log('Data received by server: ', data);
        console.log('Data converted to string: ', message);
    })
});

server.listen(2000);