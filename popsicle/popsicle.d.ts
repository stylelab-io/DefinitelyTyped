/// <reference path="./../q/Q.d.ts" />

declare module popsicle {

    export interface Request {

        method?: string;

        url: string;

        body?: any;

        headers?: any;

        query?: string;

        timeout?: number;

        parse?: boolean;

        maxRedirects?: number;

        agent?: any;

        jar?: any;

        rejectUnauthorized?: boolean;

        stream?: boolean;

        raw?: boolean;

        encoding?: string;

    }

    export interface Response {

        body : string;

    }

}

declare module "popsicle" {

    function popsicle(url : string) : Q.IPromise<popsicle.Response>;

    function popsicle(request : popsicle.Request) : Q.IPromise<popsicle.Response>;

    export = popsicle;

}