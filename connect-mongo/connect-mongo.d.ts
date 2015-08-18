/// <reference path="../express-session/express-session.d.ts" />

declare module "connect-mongo" {

    interface MongoStatic {

        new(x : any) : any;

    }

    function m(session): MongoStatic;

    export = m;

}