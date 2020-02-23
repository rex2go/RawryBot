import {Command} from "../Command/Command";
import {RawrBucksCommand} from "../Command/RawrBucksCommand";
import {Rawry} from "../Rawry";
import {User} from "../Entity/User";

export class CommandManager {
    private commands: Command[] = [];
    private readonly rawry: Rawry;

    constructor(rawry: Rawry) {
        this.rawry = rawry;

        this.initCommands();
    }

    private initCommands() {
        this.commands.push(new RawrBucksCommand(this.rawry));
    }

    executeCommand(command: string, user: User) {
        for (let i = 0; i < this.commands.length; i++) {
            let cmd: Command = this.commands[i];

            if (cmd.command == command) {
                cmd.execute(user);
            } else {
                for (let j = 0; j < cmd.aliases.length; j++) {
                    let alias: string = cmd.aliases[j];

                    if (alias == command) {
                        cmd.execute(user);
                    }
                }
            }
        }
    }
}