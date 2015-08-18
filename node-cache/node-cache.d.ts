declare module "node-cache" {

    class NodeCache {

        public constructor();

        public set(key : string, value : any) : void;

        public get(key : string) : any;

    }

    export = NodeCache;

}