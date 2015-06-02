/// <reference path="./../q/Q.d.ts" />

declare module "popsicle" {

    interface Request {

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

    interface Response {

        body : string;

    }

    function popsicle(url : string) : Q.IPromise<Response>;

    function popsicle(request : Request) : Q.IPromise<Response>;

    export = popsicle;

}