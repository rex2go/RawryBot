import {Command} from "./Command";
import {User} from "../User/User";
import {Rawry} from "../Rawry";
import {Rank} from "../User/Rank";

export class SkipCommand extends Command {

    constructor(rawry: Rawry) {
        super("skip", [], rawry);
    }

    async execute(user: User, args: string[]) {
        if(!user.hasPermission(Rank.MODERATOR)) {
            return;
        }

        const spotify = this.rawry.spotify;

        if(!spotify || !spotify.chatControl) {
            this.rawry.sendMessage(`@${user.getUsername()} Spotify ist deaktiviert`);
        }

        await spotify.api.skipToNext();
    }
}