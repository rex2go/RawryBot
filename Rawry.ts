import * as tmi from "tmi.js";
import { onMessage } from "./Handler/MessageHandler";
import { onConnect} from "./Handler/ConnectHandler";

export class Rawry {
    client: tmi;

    constructor(opts) {
        this.client = new tmi.client(opts);
    }

    connect() {
        this.client.on('message', onMessage);
        this.client.on('connected', onConnect);

        this.client.connect();
    }
}