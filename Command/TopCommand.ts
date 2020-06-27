import { Command } from "./Command";
import { User } from "../User/User";
import { Rawry } from "../Rawry";
import {query} from "../Util/Database";

export class TopCommand extends Command {

    constructor(rawry: Rawry) {
        super("top", [], rawry);
    }

    execute(user: User, args: string[]) {
        let topArr: any = query("SELECT username, money FROM rawry.user WHERE streamer_id = ? ORDER BY money DESC LIMIT 5", [this.rawry.streamerId]);

        topArr.forEach((top, index) => {
            this.rawry.sendMessage(`#${index+1} ${user.getUsername()}: ${user.getMoney()} ${user.getMoney() == 1 ? "RawrBuck" : "RawrBucks"}`);
        });
    }
}