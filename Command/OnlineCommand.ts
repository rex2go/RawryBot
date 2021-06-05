import {Command} from "./Command";
import {User} from "../User/User";
import {Rawry} from "../Rawry";
import {Rank} from "../User/Rank";

export class OnlineCommand extends Command {

    constructor(rawry: Rawry) {
        super("online", ['up', 'uptime'], rawry);
    }

    async execute(user: User, args: string[]) {
        const date = new Date();
        let diff = Math.abs(date.getTime() - this.rawry.onlineTime) / 1000;

        const hours = Math.floor(diff / 3600) % 24;
        diff -= hours * 3600;

        const minutes = Math.floor(diff / 60) % 60;
        diff -= minutes * 60;

        const seconds = Math.floor(diff % 60);

        let time = [];

        if(hours > 0) {
            if(hours == 1) {
                time.push(hours + ' Stunde');
            } else {
                time.push(hours + ' Stundem');
            }
        }

        if(minutes > 0) {
            if(minutes == 1) {
                time.push(minutes + ' Minute');
            } else {
                time.push(minutes + ' Minuten');
            }
        }

        if(seconds > 0) {
            if(seconds == 1) {
                time.push(seconds + ' Sekunde');
            } else {
                time.push(seconds + ' Sekunden');
            }
        }

        this.rawry.sendMessage('Der Stream ist online seit ' + time.join(', '));
    }

}