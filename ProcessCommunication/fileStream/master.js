const os = require("os");
const cp = require("child_process");

console.log("Started master: ", process.pid);

const cpuCount = os.cpus().length;
const workers = [];
console.log("CPU count: ", cpuCount + "\n");

const tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const result = [];

for (let cpu = 0; cpu < cpuCount; cpu++) {
  const worker = cp.fork("./worker.js");
  console.log("Worker started with PID: ", worker.pid);
  workers.push(worker);
}
console.log("\n");

workers.forEach((worker) => {
  worker.send({ tasks });

  worker.on("message", (message) => {
    console.log("Message from worker: ", worker.pid, message.result);
    if (message.result === "error") {
      process.exit(1);
    }

    result.push(message.result);

    if (result.length === cpuCount) {
      process.exit(0);
    }
  });

  setTimeout(() => process.exit(1), 5000);
});

process.on("exit", (code) => {
  console.log("Process exited: ", process.pid, code);
});
