import {Rawry} from "../Rawry";
import {Command} from "../Command/Command";
import {Module} from "./Module";

export abstract class CommandModule implements Module {
    private readonly rawry: Rawry;
    protected enabled: boolean = false;

    constructor(rawry: Rawry) {
        this.rawry = rawry;
    }

    abstract disable(): void;

    abstract enable(): void;

    registerCommand(command: Command): void {
        this.rawry.commandService.getCommands().push(command);
    }

    unregisterCommand(command: Command): void {
        let commands: Command[] = this.rawry.commandService.getCommands();

        for(let i = commands.length - 1; i >= 0; i--) {
            if(commands[i] === command) {
                commands.splice(i, 1);
            }
        }
    }

    isEnabled(): boolean {
        return this.enabled;
    }
}