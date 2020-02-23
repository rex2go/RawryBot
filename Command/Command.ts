import { User } from "../Entity/User";
import { Rawry } from "../Rawry";

export abstract class Command {
    command: string;
    aliases: string[];
    rawry: Rawry;

    protected constructor(command: string, aliases: string[] | undefined, rawry: Rawry) {
        this.command = command;
        this.aliases = aliases;
        this.rawry = rawry;
    }

    abstract execute(user: User);
}