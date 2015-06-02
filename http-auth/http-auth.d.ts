declare module "http-auth" {

    export function basic(x : any, y : Function);

    export function connect(x : any);

}

declare module Express {

    export interface Request {
        user? : any;
    }

}