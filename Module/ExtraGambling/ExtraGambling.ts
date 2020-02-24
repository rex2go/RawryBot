import {CommandModule} from "../CommandModule";

export class ExtraGambling extends CommandModule {

    disable(): void {
        this.enabled = false;
    }

    enable(): void {
        this.enabled = true;
    }
}