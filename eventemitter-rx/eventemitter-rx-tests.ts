/// <reference path="eventemitter-rx.d.ts"/>

import EventEmitterRx = require('eventemitter-rx');


var eventEmitter: EventEmitterRx = new EventEmitterRx();
var callback: Function = () => {
    console.log('callback called');
};
const EVENT:string = 'myEvent';
const DATA:string = 'myData';

eventEmitter.subscribe(EVENT, callback);
eventEmitter.hasObserver(EVENT);
eventEmitter.next(EVENT, DATA);
eventEmitter.dispose(EVENT);
eventEmitter.next(EVENT, DATA);
eventEmitter.disposeAll();
