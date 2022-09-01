const threads = require('worker_threads');
const http = require('http');

const port = 8001;

threads.parentPort.postMessage({name: 'started', port});

const { buffer } = threads.workerData;
const array = new Int32Array(buffer);

const routing = {
    '/': async (req, res) => ({ status: res.statusCode}),
    '/api/method': async (req, res) => ({status: res.statusCode}),
    '/api/method/2': async (req, res) => ({status: res.statusCode}),
    '/api/method/3': async (req, res) => ({status: res.statusCode}),
}

const types = {
    object: JSON.stringify,
    string: (s) => s,
    number: (n) => n.toString(),
    undefined: () => 'Not Found'
}

http.createServer(async (req, res) => {
    const handler = routing[req.url];
    if (!handler){
        res.end('Handler not found');
        return;
    }

    if (req.url === '/api/method') {
        threads.parentPort.postMessage({name: 'v1', text: 'Request received and showed in Master Thread'});
    }

    if (req.url === '/api/method/2') {
        array[1] = 13;
        threads.parentPort.postMessage({name: 'v2', text: 'Change first array element'});
    }

    if (req.url === '/api/method/3') {
        Atomics.store(array, 5, 100);
        Atomics.notify(array, 5);
        threads.parentPort.postMessage({name: 'v3'});
    }

    const data = await handler(req, res);
    const type = typeof data;
    const serializer = types[type];
    const result = serializer(data);
    res.end(result);
}).listen(port);