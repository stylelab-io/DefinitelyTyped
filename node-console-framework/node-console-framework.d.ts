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
            factory(sc: Typeioc.IContainer): Typeioc.IFactory<ICommand>;
            execute(): Q.Promise<any>;
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
            factory(sc: Typeioc.IContainer): Typeioc.IFactory<IService>;
        }
    }

    export class ApplicationKernel {
        registeredCommands: Command.ICommand[];
        registeredServices: Service.IService[];

        constructor();
        preRunHook(app: ConsoleApplication);
        postRunHook(app: ConsoleApplication);
    }

    export class ConsoleApplication {
        constructor(kernel: ApplicationKernel);
        constructor(kernel: ApplicationKernel, env: string);
        run();
    }
}
