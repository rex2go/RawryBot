import {Command} from "./Command";
import {User} from "../User/User";
import {Rawry} from "../Rawry";

export class SongCommand extends Command {

    constructor(rawry: Rawry) {
        super("song", [], rawry);
    }

    async execute(user: User, args: string[]) {
        const spotify = this.rawry.spotify;

        if(!spotify || !spotify.chatControl) {
            this.rawry.sendMessage(`@${user.getUsername()} Spotify ist deaktiviert`);
        }

        spotify.api.getMyCurrentPlaybackState({}).then((data) => {
            let artists = "";

            // @ts-ignore
            data.body.item.artists.forEach(function (artist) {
                artists += artist.name + ", ";
            });

            artists = artists.slice(0, -2);

            this.rawry.sendMessage("Gerade läuft: " + artists + " - " + data.body.item.name.replace("\"", ""));
        }, (err) => {
            console.error("Fehler", err);
        });
    }
}