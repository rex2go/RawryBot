import { rawry } from "../App";
import { User } from "../Entity/User";

export async function onMessage(channel, chatUser, message, self) {
    if (self) {
        return;
    }

    if(message.startsWith("!")) {
        // TODO Args, etc.

        let user: User = await rawry.userManager.getUser(chatUser);
        rawry.commandManager.executeCommand(message.substring(1), user);
    }
};