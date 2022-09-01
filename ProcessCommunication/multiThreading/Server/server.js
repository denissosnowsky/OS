const threads = require("worker_threads");
const { Worker } = threads;

const buffer = new SharedArrayBuffer(1024);
const array = new Int32Array(buffer);
console.log(array);

const worker = new Worker("./http.js", { workerData: { buffer } });

worker.on("message", (message) => {
  if (message.name === "started") {
    console.log(`HTTP Server Started on port: ${message.port}`);
  } else if(message.name === "v1"){
    console.log('Message from worker thread to Master: ', message.text);
  } else {
    console.log(array);
  }
});

worker.on("error", (err) => {
  console.log(err.stack);
});
worker.on("exit", (code) => {
  console.dir({ code });
}); 

process.on("SIGINT", async () => {
  await worker.terminate();
  console.log("HTTP Server Stopped");
});

const res = Atomics.wait(array, 5, 0); // uncomment to check secure array mutation
console.dir({ res });
