declare module AngularDecorators {

    export function Module(...params:any[]);
    export function Inject(...dependencies:string[]);

    export function Component(config: IComponentConfig);

    interface IComponentConfig {
        selector: string,
        bind?:Object,
        controllerAs?: string
    }

    export function Controller(type:string);

    export function Directive(config: IDirectiveConfig);

    interface IDirectiveConfig {
        selector: string,
        bind?:Object
        scrope?:Object,
        controllerAs?: string
        properties?:string[]
    }

    export function Filter();
    export function Provider();
    export function Factory();
    export function Service(type:string);
    export function Animation();

    export function Require();

    export function View(config:IViewConfig);

    interface IViewConfig {
        template?: string,
        templateUrl?: string
    }

    export function Transclude();

}

declare module 'angular-decorators' {
    export = AngularDecorators;
}
