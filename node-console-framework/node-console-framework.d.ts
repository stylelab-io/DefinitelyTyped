/// <reference path="../q/Q.d.ts"/>
/// <reference path="../typeioc/typeioc.d.ts"/>
/// <reference path="../node/node.d.ts"/>

declare module '@furny/node-console-framework' {

    export module Command {
        export interface IArgument {
            name: string;
            required: boolean;
            type: any;
            alias: string;
            description: string;
            defaultValue ? : any;
            validation?: any;
        }

        export interface ICommand {
            getName(): string;
            getDescription(): string;
            getArguments(): IArgument[];
            execute(sc: DependencyInjection.Container, args: Input.ArgvInput): Q.Promise<any>;
        }
    }

    export module DependencyInjection {
        export class Container {
            constructor();
            get<T>(name: string): any;
            registerService(name:string, creator: Typeioc.IFactory<any>): Container;
        }
    }

    export module Input {
        export class ArgvInput {
            constructor(serviceBuilder: Typeioc.IContainer, argv: any);
            initCommands(): ArgvInput;
            addCommand(cmd: Command.ICommand): ArgvInput;
        }

        export interface IInput {
            getCommand(): string;
            getArguments(): string[];
            getArgument(index: number): string;
            getOptions(): any;
            getOption(key: string): IOption;
            hasOption(key: string): boolean;
        }

        export class Input {
            command: string;
            arguments: string[];
            options: any;

            getCommand(): string;
            getArguments(): string[];
            getArgument(index: number): string;
            getOptions(): any;
            getOption(key: string): IOption;
            hasOption(key: string): boolean;
        }

        export interface IOption {
            getKey(): string;
            getValue(): string;
        }
    }

    export module Output {
        export class ConsoleOutput extends Output {
            stdout: NodeJS.WritableStream;
            stderr: NodeJS.WritableStream;

            constructor(stdout: NodeJS.WritableStream, stderr: NodeJS.WritableStream);
            write(string: string);
            writeErr(string: string);
            format(...args: any[]);
        }

        export interface IOutput {
            write(string: string);
            writeErr(string: string);
            format(...args:  any[]);
        }

        export abstract class Output {
            write(string: string);
            writeErr(string: string);
            format(...args:  any[]);
        }
    }

    export module Service {
        export interface IService {
            getName(): string;
            factory(): Typeioc.IFactory<IService>;
        }
    }

    export class ApplicationKernel {
        registeredCommands: Command.ICommand[];
        registeredServices: Service.IService[];

        constructor();
        preRunHook(sc: DependencyInjection.Container);
        postRunHook(sc: DependencyInjection.Container, data: any);
    }

    export class ConsoleApplication {
        constructor(kernel: ApplicationKernel);
        constructor(kernel: ApplicationKernel, env: string);
        run();
    }
}
