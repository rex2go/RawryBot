import {Command} from "./Command";
import {User} from "../User/User";
import {Rawry} from "../Rawry";
import {Rank} from "../User/Rank";

export class VolumeCommand extends Command {

    constructor(rawry: Rawry) {
        super("volume", ['vol'], rawry);
    }

    async execute(user: User, args: string[]) {
        if(!user.hasPermission(Rank.MODERATOR)) {
            return;
        }

        const spotify = this.rawry.spotify;

        if(!spotify || !spotify.chatControl) {
            this.rawry.sendMessage(`@${user.getUsername()} Spotify ist deaktiviert`);
        }

        if (args.length < 1) {
            this.rawry.sendMessage(`@${user.getUsername()} !volume <Lautstärke>`);
            return;
        }

        try {
            const volume = parseInt(args[0]);

            if(volume > 100 || volume < 0) {
                throw new Error();
            }

            await spotify.api.setVolume(volume);
        } catch(exception) {
            this.rawry.sendMessage(`@${user.getUsername()} Ungültige Lautstärke`);
            return;
        }
    }
}