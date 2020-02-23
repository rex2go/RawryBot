import { Rawry } from "../Rawry";
import { User } from "../Entity/User";
import {query} from "../Util/Database";

export class UserManager {
    private users: User[] = [];
    private readonly rawry: Rawry;

    constructor(rawry: Rawry) {
        this.rawry = rawry;
    }

    async getUser(chatUser: any) : Promise<User> {
        let username: string = chatUser.username;
        for(let i = 0; i<this.users.length; i++) {
            let user = this.users[i];

            if(user.username == username) {
                return user;
            }
        }

        return await this.loadUser(chatUser);
    }

    async loadUser(chatUser: any) : Promise<User> {
        let dbUser: any =  await query("SELECT * FROM rawry.user WHERE username = ? AND streamer_id = ?", [chatUser.username, this.rawry.streamerId]);
        dbUser = dbUser[0];
        if(!dbUser.length) {
            let response: any = await query("INSERT INTO rawry.user (streamer_id, username, money, message_count) VALUES (?, ?, ?, ?)", [this.rawry.streamerId, chatUser.username, 0, 0]);
            return new User(response.insertId, 0, 0, chatUser);
        } else {
            return new User(dbUser.id, dbUser.money, dbUser.messageCount, chatUser);
        }
    }
}