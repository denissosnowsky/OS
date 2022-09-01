const callbackify =
  (fn) =>
  (...args) => {
    const callback = args.pop();
    fn(...args)
      .then((value) => callback(null, value))
      .catch((error) => callback(error));
  };


  // Usage

const half = x => Promise.resolve(x / 2);
const twice = x => Promise.resolve(x * 2);

const callbckHalf = callbackify(half);
const callbckTwice = callbackify(twice);

twice(100)
  .then((value) => half(value))
  .then((result) => {
    console.dir({ promise: result });
  });

callbckHalf(10, (err, data) => {
  callbckTwice(data, (err, result) => {
    console.log(result);
  });
});
