import { Command } from "./Command";
import { User } from "../Entity/User";
import { Rawry } from "../Rawry";

export class TogoCommand extends Command {

    constructor(rawry: Rawry) {
        super("togo", ["coins", "rawrbucks"], rawry);
    }

    execute(user: User) {
        this.rawry.sendMessage(user.money.toString());
    }
}