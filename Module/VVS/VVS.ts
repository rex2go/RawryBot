import {CommandModule} from "../CommandModule";

// Viewer Versus Streamer
export class VVS extends CommandModule {

    disable(): void {
        this.enabled = false;
    }

    enable(): void {
        this.enabled = true;
    }
}