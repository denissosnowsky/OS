'use strict';

const EventEmitter = function(){
    this.event = {};
}

EventEmitter.prototype.on = function(name, clb){
    const event = this.event[name];
    if (event) event.push(clb);
    else this.event[name] = [clb]
}

EventEmitter.prototype.emit = function(name, ...args){
    const event = this.event[name];
    if (!event) return;

    for (const listener of event) listener(...args);
}

module.export = EventEmitter;

// usage

const ee = new EventEmitter();
ee.on('event1', (date) => {
    console.log(`event1 first listener: ${date}`)
})
ee.on('event1', (date) => {
    console.log(`event1 second listener: ${date}`)
})

ee.on('event2', (date) => {
    console.log(`event2 first listener: ${date}`)
})

ee.emit('event1', 'event1 data');
ee.emit('event2', 'event2 data');
