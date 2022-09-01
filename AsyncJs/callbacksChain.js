const chain = (prev = null) => {
  const cur = () => {
    if (cur.prev) {
      cur.prev.next = cur;
      cur.prev();
    } else {
      cur.forward();
    }
  };
  cur.prev = prev;
  cur.fn = null;
  cur.args = null;
  cur.do = (fn, ...args) => {
    cur.fn = fn;
    cur.args = args;
    return chain(cur);
  };
  cur.forward = () => {
    if (cur.fn) {
      cur.fn(...cur.args, (err, data) => {
        if (!err && cur.next) {
          cur.next.forward();
        } else {
          console.log("Done!");
        }
      });
    }
  };
  return cur;
};

// usage

const readFile = (arg, clb) => {
    setTimeout(() => {
        console.log('readFile executed with argument: ' + arg);
        clb(null, 'mockArgument');
    }, 3000);
}

const makeHttpRequest = (arg, clb) => {
    setTimeout(() => {
        console.log('httpRequest executed with argument: ' + arg);
        clb(null, 'mockArgument');
    }, 3000);
}

const startChain = chain().do(readFile, 'Harry Potter').do(makeHttpRequest, 'http://localhost:3000/books');
startChain();
