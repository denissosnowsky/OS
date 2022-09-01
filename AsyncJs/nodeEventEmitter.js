const events = require('events');

const event = () => {
    const ee = new events.EventEmitter();
    const emit = ee.emit;
    ee.emit = (...args) => {
        if(args[0] !== '*') emit.apply(ee, args);
        args.unshift('*');
        emit.apply(ee, args);
    }
    return ee;
}

module.exports = event;

// usage
const ee = event();

ee.on('event1', (data) => {
    console.log(`event1: ${data}`);
})

ee.on('*', (name, data) => {
    console.log('* event');
    console.log(`* event, name: ${name}`);
    console.log(`* event, data: ${data}`);
    console.log('');
})

ee.emit('event1', 1);
ee.emit('event2', 2);
ee.emit('*', 'start');