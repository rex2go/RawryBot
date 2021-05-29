import { Command } from "./Command";
import { User } from "../User/User";
import { Rawry } from "../Rawry";

export class RawrBucksCommand extends Command {

    constructor(rawry: Rawry) {
        super("togo", ["coins", "rawrbucks"], rawry);
    }

    async execute(user: User, args: string[]) {
        this.rawry.sendMessage(`@${user.getUsername()} hat ${user.getMoney()} ${user.getMoney() == 1 ? "RawrBuck" : "RawrBucks"}`);
    }
}