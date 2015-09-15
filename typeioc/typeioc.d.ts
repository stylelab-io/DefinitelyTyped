/*---------------------------------------------------------------------------------------------------
 * Copyright (c) 2015 Maxim Gherman
 * typeioc - Dependency injection container for node typescript
 * @version v1.2.9
 * @link https://github.com/maxgherman/TypeIOC
 * @license (MIT) - https://github.com/maxgherman/TypeIOC/blob/master/LICENSE
 * --------------------------------------------------------------------------------------------------*/


declare module Typeioc {

    function createBuilder() : IContainerBuilder;

    module Types {
        const enum Scope  {
            None = 1,
            Container = 2,
            Hierarchy = 3
        }

        const enum Owner {
            Container = 1,
            Externals = 2
        }
    }

    module Exceptions {
        class BaseError implements Error {

            public stack;
            public message : string;
            public name : string;
            public data : any;
            public innerError : BaseError;
        }

        class ApplicationError extends BaseError { }

        class ArgumentError extends ApplicationError {
            public argumentName: string;
        }

        class ArgumentNullError extends ArgumentError { }

        class ResolutionError extends ApplicationError { }

        class StorageKeyNotFoundError extends ApplicationError { }

        class ConfigurationError extends ApplicationError { }

        class NullReferenceError extends ApplicationError { }

        class ProxyError extends ApplicationError { }
    }

    interface IContainerBuilder {
        defaults : IDefaults;
        register<R>(service : any) : IRegistration<R>;
        registerModule(serviceModule : Object) : Typeioc.IAsModuleRegistration;
        registerConfig(config : Typeioc.IConfig) : void;
        build() : IContainer
    }

    interface IContainer {
        cache : any;
        resolve<R>(service: any, ...args:any[]) : R;
        tryResolve<R>(service: any, ...args:any[]) : R;
        resolveNamed<R>(service: any, name : string, ...args:any[]) : R;
        tryResolveNamed<R>(service: any, name : string, ...args:any[]): R;
        resolveWithDependencies<R>(service: any, dependencies : IDynamicDependency[]) : R;
        resolveWith<R>(service : any) : IResolveWith<R>;

        createChild : () => IContainer;
        dispose: () =>  void;
    }

    interface IResolveWith<T>  extends IResolveTryNamedDepCache<T> {
        args(...args:any[]) : IResolveTryNamedDepCache<T>;
    }

    interface IResolveTryNamedDepCache<T> extends IResolveTry<T>, IResolveNamedDepCache<T> { }

    interface IResolveNamedDepCache<T> extends IResolveNamed<T>, IResolveDepCache<T> { }

    interface IResolveDepCache<T> extends IResolveDependencies<T>, IResolveCacheReturn<T> { }

    interface IResolveCacheReturn<T> extends IResolveCache<T>, IResolveReturn<T> { }

    interface IResolveNamed<T> {
        name(value : string) : IResolveDepCache<T>;
    }

    interface IResolveTry<T> {
        attempt() : IResolveNamedDepCache<T>;
    }

    interface IResolveDependencies<T> {
        dependencies(dependencies : Typeioc.IDynamicDependency | Array<Typeioc.IDynamicDependency>) : IResolveDepCache<T>;
    }

    interface IResolveCache<T> {
        cache(name? : string) : IResolveReturn<T>
    }

    interface IResolveReturn<T> {
        exec(): T;
    }

    interface IInitializer<T> {
        (IContainer, item : T) : void;
    }

    interface IDisposer<T> {
        (item : T) : void;
    }

    interface IOwned {
        ownedBy : (owner : Types.Owner) => void;
    }

    interface IReused {
        within : (scope: Types.Scope) => IOwned;
    }

    interface IReusedOwned extends IReused, IOwned { }

    interface INamed {
        named : (name: string) => IReusedOwned;
    }

    interface INamedReusedOwned extends INamed, IReusedOwned {}

    interface IDisposable<T> {
        dispose : (action : IDisposer<T>) =>  INamedReusedOwned;
    }

    interface INamedReusedOwnedDisposed<T> extends IDisposable<T>, INamedReusedOwned {}

    interface IInitialized<T> {
        initializeBy : (action : IInitializer<T>) => INamedReusedOwnedDisposed<T>;
    }

    interface IInvoker {
        () : any;
    }

    interface IFactory<T> {
        (c: IContainer, arg1 : any, arg2 : any, arg3 : any, arg4 : any, arg5 : any, arg6 : any, arg7 : any) : T;
    }

    interface IInitializedDisposedNamedReusedOwned<T> extends IInitialized<T>, IDisposable<T>, INamedReusedOwned { }

    interface IAs<T> {
        as(factory: IFactory<T>) : IInitializedDisposedNamedReusedOwned<T>;
    }

    interface IRegistration<T> extends IAs<T> { }

    interface IModuleReusedOwned extends IReusedOwned {
        forService<R>(service: any, factory : IFactory<R>) : IModuleReusedOwned;
        forArgs(service: any, ...args:any[]) : IModuleReusedOwned;
        named(service: any, name : string) : IModuleReusedOwned;
    }

    interface IAsModuleRegistration {
        as : (asModule : Object) => IModuleReusedOwned;
    }

    interface IDynamicDependency {
        service : any;
        factory: IFactory<any>;
        named? : string;
        initializer? : IInitializer<any>;
        required? : boolean;
    }

    interface IInstanceLocation {
        instanceModule? : Object;
        name : string;
    }

    interface IInstantiationItem {
        isDependency? : boolean;
        location? : IInstanceLocation;
        instance? : any;
    }

    interface IComponent {
        service : IInstanceLocation;
        resolver? : IInstanceLocation;
        parameters? : IInstantiationItem[];
        factory? : IFactory<any>;
        named? : string;
        within? : Types.Scope;
        ownedBy? : Types.Owner;
        initializeBy? : IInitializer<any>;
        disposer? : IDisposer<any>;
    }

    interface IForInstance {
        resolver : IInstanceLocation;
        parameters? : IInstantiationItem[];
        factory? : IFactory<any>;
    }

    interface IModule {
        forModule? : boolean;
        serviceModule? : Object;
        resolverModule? : Object;
        within? : Types.Scope;
        ownedBy? : Types.Owner;
        forInstances? : IForInstance[];
        components? : IComponent[];
    }

    interface IConfig {
        components? : IComponent[];
        modules? : IModule[];
    }

    interface IDefaults {
        scope : Types.Scope;
        owner : Types.Owner;
    }
}

declare module "typeioc" {
    export = Typeioc;
}