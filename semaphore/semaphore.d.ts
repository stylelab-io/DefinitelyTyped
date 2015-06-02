declare module sem {

    export interface ISemaphore {

        capacity : number;

        current : number;

        take(cb: Function);

        leave();

    }

}

declare module "semaphore" {

    function sem(slots : number) : sem.ISemaphore;

    export = sem;

}