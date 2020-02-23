import { Rawry } from "./Rawry";
import * as fs from "file-system";

const credentials = JSON.parse(fs.readFileSync("credentials.json"));
const opts = {
    identity: {
        username: credentials.username,
        password: credentials.oauth
    },
    channels: [
        credentials.channel
    ]
};

const rawry = new Rawry(opts);
rawry.connect();