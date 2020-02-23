import * as tmi from "tmi.js";
import {onMessage} from "./Handler/MessageHandler";
import {onConnect} from "./Handler/ConnectionHandler";
import {CommandManager} from "./Manager/CommandManager";
import {query} from "./Util/Database";
import * as app from "./App";
import {UserManager} from "./Manager/UserManager";

export class Rawry {
    client: tmi;
    streamerId: number;
    opts: any;
    commandManager: CommandManager;
    userManager: UserManager;

    constructor(opts) {
        this.opts = opts;
        this.client = new tmi.client(opts);
    }

    connect() {
        this.client.on('message', onMessage);
        this.client.on('connected', onConnect);

        this.client.connect();
    }

    async setup() {
        this.commandManager = new CommandManager(app.rawry);
        this.userManager = new UserManager(app.rawry);

        await this.setupDatabase();
        this.connect();
    }

    private async setupDatabase() {
        let channel: string = this.opts.channels[0];

        await query("CREATE DATABASE IF NOT EXISTS rawry;");
        await query("CREATE TABLE IF NOT EXISTS rawry.streamer ( id INT(11) AUTO_INCREMENT, streamer VARCHAR(64) NOT NULL, PRIMARY KEY(id) );");
        await query("CREATE TABLE IF NOT EXISTS rawry.user ( id INT(11) AUTO_INCREMENT, streamer_id INT(11) NOT NULL, username VARCHAR(64) NOT NULL, money FLOAT DEFAULT 0.0, message_count INT(11) DEFAULT 0, PRIMARY KEY(id), FOREIGN KEY(streamer_id) REFERENCES rawry.streamer(id) );");

        let streamer: any = await query("SELECT * FROM rawry.streamer WHERE streamer = ?", [channel]);
        if (!streamer.length) {
            let response: any = await query("INSERT INTO rawry.streamer (streamer) VALUES (?)", [channel]);
            this.streamerId = response.insertId;
        } else {
            this.streamerId = streamer[0].id;
        }
    }

    sendMessage(msg: string) {
        this.client.say(this.client.channels[0], msg);
    };
}