import { Command } from "./Command";
import { User } from "../User/User";
import { Rawry } from "../Rawry";

export class RawrBucksCommand extends Command {

    constructor(rawry: Rawry) {
        super("togo", ["coins", "rawrbucks"], rawry);
    }

    execute(user: User, args: string[]) {
        this.rawry.sendMessage(`@${user.username} hat ${user.money} ${user.money == 1 ? "RawrBuck" : "RawrBucks"}`);
    }
}