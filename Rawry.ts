import * as tmi from "tmi.js";
import {onMessage} from "./Handler/MessageHandler";
import {onConnect} from "./Handler/ConnectionHandler";
import {CommandService} from "./Command/CommandService";
import {UserService} from "./User/UserService";
import {query} from "./Util/Database";
import * as app from "./App";
import {ModuleService} from "./Module/ModuleService";
import {ExitHandler} from "./Handler/ExitHandler";
import {WebService} from "./Web/WebService";
import {Spotify} from "./Util/Spotify";
import {Client} from "tmi.js";

export class Rawry {
    client: Client;
    streamerId: number;
    opts: any;
    commandService: CommandService;
    userService: UserService;
    moduleService: ModuleService;
    creditService: WebService;
    spotify: Spotify;
    onlineTime: number;

    constructor(opts) {
        this.opts = opts;
        this.client = new tmi.client(opts);
        this.onlineTime = new Date().getTime();

        new ExitHandler(this);
    }

    async disable() {
        await this.userService.saveAllUsers();
        console.log("Saved users. Quitting.")
    }

    async connect() {
        this.client.on('message', onMessage);
        this.client.on('connected', onConnect);

        await this.client.connect();
    }

    async setup() {
        this.commandService = new CommandService(app.rawry);
        this.userService = new UserService(app.rawry);
        this.moduleService = new ModuleService(app.rawry);
        this.creditService = new WebService(app.rawry);

        await this.setupDatabase();
        await this.connect();
    }

    setupSpotify(spotifyCredentials) {
        this.spotify = new Spotify(spotifyCredentials);
        this.spotify.connect(spotifyCredentials.spotifyRefreshToken)
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
        this.client.say(this.client.getChannels()[0], msg);
    };
}