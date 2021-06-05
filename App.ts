import {Rawry} from "./Rawry";
import * as fs from "file-system";
import * as mysql from "mysql";

const credentials = JSON.parse(fs.readFileSync("credentials.json"));
const opts = {
    identity: {
        username: credentials.twitch.username,
        password: credentials.twitch.oauth
    },
    channels: [
        credentials.twitch.channel
    ]
};

export const pool = mysql.createPool({
    host: credentials.database.host,
    user: credentials.database.user,
    password: credentials.database.password
});

export const rawry = new Rawry(opts);
rawry.setup();
rawry.setupSpotify(credentials.spotify);