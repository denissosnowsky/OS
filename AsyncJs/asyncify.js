const asyncify =
  (fn) =>
  (...args) => {
    const callback = args.pop();
    setTimeout(() => {
      try {
        const result = fn(...args);
        if (result instanceof Error) callback(result);
        else callback(null, result);
      } catch (error) {
        callback(error);
      }
    }, 0);
  };


// Usage

const half = x => x/2;
const multiple = x => x*2;

const asyncHalf = asyncify(half);
const asyncMultiple = asyncify(multiple);
asyncHalf(10, (err, data) => {
    asyncMultiple(data, (err, res) => {
        console.log(`async result: ${res}`)
    })
});

const syncResult = half(multiple(10))
console.log(`sync result: ${syncResult}`)
