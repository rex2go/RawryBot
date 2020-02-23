import { rawry } from "../App";
import { User } from "../Entity/User";

export function onMessage(channel, chatUser, message, self) {
    if (self) {
        return;
    }

    if(message.startsWith("!")) {
        // TODO Args, etc.

        let user = new User( 1, 15, 5, chatUser);
        rawry.commandManager.executeCommand(message.substring(1), user);
    }
};