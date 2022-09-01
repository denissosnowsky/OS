const promisify =
  (fn) =>
  (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (error, data) => {
        if (error) reject(error);
        else resolve(data);
      });
    });
  };

// Usage

const twiceCallback = (x, callback) => {
  callback(null, x * 2);
};
const twicePromise = promisify(twiceCallback);

const halfCallback = (x, callback) => {
  callback(null, x / 2);
};
const halfPromise = promisify(halfCallback);

twiceCallback(100, (e, value) => {
  halfCallback(value, (e, result) => {
    console.dir({ callbackLast: result });
  });
});

twicePromise(100)
  .then((value) => halfPromise(value))
  .then((value) => console.log(`promise response: ${value}`));
