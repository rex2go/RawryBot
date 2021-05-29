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

    private lastMessageTime: number;
    private messageStreak: number = 0;

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

    checkReward() {
        if(this.messageCount % 1000 == 0) {
            this.rawry.sendMessage(`@${this.username}, das ist deine ${this.messageCount}. Nachricht. Du hast 50 RawrBucks erhalten.`);
            this.setMoney(this.getMoney() + 50);
        }

        const currentTime: number = new Date().getTime();

        if(!this.lastMessageTime) {
            this.lastMessageTime = currentTime;
            return;
        }

        if(currentTime - this.lastMessageTime > 1000 * 60 * 5) {
            if(this.messageStreak >= 5 && this.messageStreak < 11) {
                this.setMoney(this.getMoney() + 2);
            } else if(this.messageStreak >= 11) {
                this.setMoney(this.getMoney() + 3);
            } else {
                this.setMoney(this.getMoney() + 1);
            }

            this.lastMessageTime = currentTime;
            this.messageStreak++;
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
    }

    getMessageCount(): number {
        return this.messageCount;
    }

    setMessageCount(messageCount: number) {
        this.messageCount = messageCount;
    }

    async flush() {
        await this.rawry.userService.saveUser(this);
    }
}