import {Rawry} from "../Rawry";

export class ModuleService {
    private readonly rawry: Rawry;

    constructor(rawry: Rawry) {
        this.rawry = rawry;
    }
}