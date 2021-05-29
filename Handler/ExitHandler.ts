import {Rawry} from "../Rawry";

export class ExitHandler {

    constructor(rawry: Rawry) {
        process.stdin.resume();

        function exitHandler(options) {
            rawry.disable().then(() => {
                if (options.exit) process.exit();
            });
        }

        process.on('exit', exitHandler.bind(null, {cleanup: true}));
        process.on('SIGINT', exitHandler.bind(null, {exit: true}));
        process.on('SIGUSR1', exitHandler.bind(null, {exit: true}));
        process.on('SIGUSR2', exitHandler.bind(null, {exit: true}));
        process.on('uncaughtException', exitHandler.bind(null, {exit: true}));
    }
}