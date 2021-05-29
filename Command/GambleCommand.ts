import {Command} from "./Command";
import {User} from "../User/User";
import {Rawry} from "../Rawry";
import {moneyString} from "../Util/Util";

export class GambleCommand extends Command {

    constructor(rawry: Rawry) {
        super("gamble", [], rawry);
    }

    async execute(user: User, args: string[]) {
        if (args.length < 1) {
            this.rawry.sendMessage(`@${user.getUsername()} !gamble <Einsatz>`);
            return;
        }

        try {
            const stake = parseInt(args[0]);

            if(stake == undefined || isNaN(stake) || stake < 0) {
                throw "Error";
            }

            if (user.getMoney() < stake) {
                this.rawry.sendMessage(`@${user.getUsername()}, du hast nicht genügend RawrBucks.`);
                return;
            }

            if (Math.random() < 0.5) {
                user.setMoney(user.getMoney() + stake);
                this.rawry.sendMessage(`@${user.getUsername()} hat soeben ${moneyString(stake * 2)} gewonnen!`);
            } else {
                user.setMoney(user.getMoney() - stake);
                this.rawry.sendMessage(`@${user.getUsername()} hat soeben ${moneyString(stake)} verloren!`);
            }

        } catch (e) {
            this.rawry.sendMessage(`@${user.getUsername()}, ungültiger Einsatz.`);
        }
    }
}