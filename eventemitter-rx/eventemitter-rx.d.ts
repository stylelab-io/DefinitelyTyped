// Type definitions for EventEmitterRx
// Project: Will be released soon...
// Definitions by: Jens Krause <https://github.com/sectore>
// Definitions: https://github.com/stylelab-io/DefinitelyTyped

/// <reference path="../rx/rx.d.ts"/>

declare class EventEmitterRx {
    constructor();
    next(name:string, data:Object):void;
    subscribe(name:string, handler:any): Rx.IDisposable;
    hasObserver(name:string):boolean;
    dispose(name:string):void;
    disposeAll():void;
}

declare module 'eventemitter-rx' {
    export = EventEmitterRx;
}
