import {Rawry} from "../Rawry";
import {User} from "./User";
import {query} from "../Util/Database";

export class UserService {

    private users: User[] = [];
    private readonly rawry: Rawry;

    constructor(rawry: Rawry) {
        this.rawry = rawry;
    }

    async getUser(chatUser: any, force: boolean = false): Promise<User> {
        let username: string = chatUser.username;

        for (let i = 0; i < this.users.length; i++) {
            let user = this.users[i];

            if (user.getUsername() == username) {
                return user;
            }
        }

        return await this.loadUser(chatUser, force);
    }



    private async loadUser(chatUser: any, force: boolean = false): Promise<User> {
        let dbUser: any = await query(
            "SELECT * FROM rawry.user WHERE username = ? AND streamer_id = ?",
            [chatUser.username, this.rawry.streamerId]
        );

        let user: User;

        if (dbUser && dbUser[0]) {
            dbUser = dbUser[0];

            user = new User(dbUser['id'], dbUser['money'], dbUser['message_count'], chatUser, this.rawry);
        } else if(force) {
            const response: any = await query(
                "INSERT INTO rawry.user (streamer_id, username, money, message_count) VALUES (?, ?, ?, ?)",
                [this.rawry.streamerId, chatUser.username, 0, 0]
            );

            user = new User(response.insertId, 0, 0, chatUser, this.rawry);
        } else {
            return undefined;
        }

        this.users.push(user);

        return user;
    }

    async saveUser(user: User) {
        return await query(
            "UPDATE rawry.user SET money = ?, message_count = ? WHERE id = ?",
            [user.getMoney(), user.getMessageCount(), user.getId()]
        );
    }

    async saveAllUsers() {
        for(const user of this.users) {
            await this.saveUser(user);
        }
    }
}