import {Command} from "./Command";
import {RawrBucksCommand} from "./RawrBucksCommand";
import {Rawry} from "../Rawry";
import {User} from "../User/User";
import {TopCommand} from "./TopCommand";

export class CommandService {
    private commands: Command[] = [];
    private readonly rawry: Rawry;

    constructor(rawry: Rawry) {
        this.rawry = rawry;

        this.initCommands();
    }

    private initCommands() {
        this.commands.push(new RawrBucksCommand(this.rawry));
        this.commands.push(new TopCommand(this.rawry));
    }

    executeCommand(command: string, args: string[], user: User) {
        for (let i = 0; i < this.commands.length; i++) {
            let cmd: Command = this.commands[i];

            if (cmd.command == command) {
                cmd.execute(user, args);
            } else {
                for (let j = 0; j < cmd.aliases.length; j++) {
                    let alias: string = cmd.aliases[j];

                    if (alias == command) {
                        cmd.execute(user, args);
                    }
                }
            }
        }
    }
}