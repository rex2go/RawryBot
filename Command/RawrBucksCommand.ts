import { Command } from "./Command";
import { User } from "../Entity/User";
import { Rawry } from "../Rawry";

export class RawrBucksCommand extends Command {

    constructor(rawry: Rawry) {
        super("togo", ["coins", "rawrbucks"], rawry);
    }

    execute(user: User) {
        this.rawry.sendMessage(`@${user.username} hat ${user.money} ${user.money == 1 ? "RawrBuck" : "RawrBucks"}`);
    }
}