import {rawry} from "../App";
import {User} from "../User/User";

export async function onMessage(channel, chatUser, message, self) {
    if (self) {
        return;
    }

    if (message.startsWith("!")) {
        let user: User = await rawry.userService.getUser(chatUser);
        rawry.commandService.executeCommand(message.substring(1), message.split(" ").shift(), user);
    }
};