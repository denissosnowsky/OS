console.log("Hello from worker: ", process.pid);

const work = (item) => item * 8;

let triesToRework = 0;

process.on("message", (message) => {
  // let triesToRework = 0;
  let result;

  console.log(
    "Message to worker: " + process.pid + " " + "from master: " + message.tasks
  );

  const toDoWork = () => {
    //if (triesToRework === 0) throw new Error(); // this is made to show an example of process failing one time;

    return message.tasks.map(work);
  };

  try {
    result = toDoWork();
  } catch {
    if (triesToRework > 1) {
      process.send({ result: "error" });
    } else {
      triesToRework++;
      result = toDoWork();
    }
  }

  console.log(
    "Retries for process: ",
    process.pid + " " + String(triesToRework) + " times"
  );
  process.send({ result });
});
