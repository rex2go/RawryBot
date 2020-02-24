import {Rank} from "./Rank";

export class User {
    id: number;
    username: string;
    money: number;
    messageCount: number;
    rank: Rank;
    chatUser: any;

    constructor(id: number, money: number, messageCount: number, chatUser: any) {
        this.id = id;
        this.username = chatUser["username"];
        this.money = money;
        this.messageCount = messageCount;
        this.chatUser = chatUser;

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
}