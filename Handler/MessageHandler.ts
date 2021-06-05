import {rawry} from "../App";
import {User} from "../User/User";

export async function onMessage(channel, chatUser, message, self) {
    rawry.creditService.checkUsername(chatUser.username);

    if (self) {
        return;
    }

    const user: User = await rawry.userService.getUser(chatUser, true);

    user.setMessageCount(user.getMessageCount() + 1);
    user.checkReward();

    await user.flush();

    if (message.startsWith("!")) {
        const args = message.split(" ");
        const command = args[0].substring(1);
        args.shift();

        await rawry.commandService.executeCommand(command, args, user);
    }

}