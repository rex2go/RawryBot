import { Command } from "./Command";
import { User } from "../User/User";
import { Rawry } from "../Rawry";
import {query} from "../Util/Database";

export class TopCommand extends Command {

    constructor(rawry: Rawry) {
        super("gamble", [], rawry);
    }

    execute(user: User, args: string[]) {
        if(args.length < 1) {
            this.rawry.sendMessage(`@${user.getUsername()} !gamble <Einsatz>`);
            return;
        }

        try {
            let einsatz = parseInt(args[0]);

            if(user.getMoney() < einsatz) {
                this.rawry.sendMessage(`@${user.getUsername()}, du hast nicht genügend RawrBucks.`);
                return;
            }

            if(Math.random() < 0.5) {
                user.setMoney(user.getMoney() + einsatz);
                this.rawry.sendMessage(`@${user.getUsername()} hat soeben ${einsatz*2} ${einsatz*2 == 1 ? "RawrBuck" : "RawrBucks"} gewonnen!`);
            } else {
                user.setMoney(user.getMoney() - einsatz);
                this.rawry.sendMessage(`@${user.getUsername()} hat soeben ${einsatz} ${einsatz == 1 ? "RawrBuck" : "RawrBucks"} verloren!`);
            }
        } catch (e) {
            this.rawry.sendMessage(`@${user.getUsername()}, ungültiger Einsatz.`);
        }
    }
}