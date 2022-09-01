const net = require("net");

const socket = new net.Socket();

console.log('Client Process ID is: ', process.pid);

socket.connect(
  {
    port: 2000,
    host: "127.0.0.1",
  },
  () => {
    socket.write("Hello from client");
    socket.on("data", data => {
      const message = data.toString();
      const user = JSON.parse(data);
      console.log("Data received by client: ", data);
      console.log("Data converted to String: ", message);
      console.log(`Age of ${user.name} is ${user.age}`);
    });
  }
);
