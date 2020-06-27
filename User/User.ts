import {Rank} from "./Rank";
import {Rawry} from "../Rawry";

export class User {
    private readonly id: number;
    private readonly username: string;
    private money: number;
    private messageCount: number;
    private rank: Rank;
    protected chatUser: any;
    protected rawry: Rawry;

    constructor(id: number, money: number, messageCount: number, chatUser: any, rawry: Rawry) {
        this.id = id;
        this.username = chatUser["username"];
        this.money = money;
        this.messageCount = messageCount;
        this.chatUser = chatUser;
        this.rawry = rawry;

        if(chatUser["badges"]) {
            if(chatUser["badges"]["broadcaster"]) {
                this.rank = Rank.STREAMER;
            } else if(chatUser["mod"]) {
                this.rank = Rank.MODERATOR;
            } else if(chatUser["subscriber"]) {
                this.rank = Rank.SUBSCRIBER
            } else {
                this.rank = Rank.USER;
            }
        } else {
            this.rank = Rank.USER;
        }
    }

    getId(): number {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getMoney(): number {
        return this.money;
    }

    setMoney(money: number) {
        this.money = money;
        this.rawry.userService.saveUser(this);
    }

    getMessageCount(): number {
        return this.messageCount;
    }

    setMessageCount(messageCount: number) {
        this.messageCount = messageCount;
        this.rawry.userService.saveUser(this);
    }
}