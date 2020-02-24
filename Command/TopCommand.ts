import { Command } from "./Command";
import { User } from "../User/User";
import { Rawry } from "../Rawry";
import {query} from "../Util/Database";

export class TopCommand extends Command {

    constructor(rawry: Rawry) {
        super("top", [], rawry);
    }

    execute(user: User, args: string[]) {
        let topArr: any = query("SELECT username, money FROM rawry.user ORDER BY money DESC LIMIT 5");

        topArr.forEach((top, index) => {
            this.rawry.sendMessage(`#${index+1} ${user.username}: ${user.money} ${user.money == 1 ? "RawrBuck" : "RawrBucks"}`);
        });
    }
}