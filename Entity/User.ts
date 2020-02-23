export class User {
    id: number;
    username: string;
    money: number;
    messageCount: number;
    rank: Rank;
    chatUser;

    constructor(id: number, money: number, messageCount: number, chatUser) {
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

enum Rank {
    USER = 0,
    SUBSCRIBER = 1,
    MODERATOR = 2,
    STREAMER = 3
}