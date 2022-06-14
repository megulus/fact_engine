import { FactStore } from "./fact-store.js";
import { Parser } from "./parser.js";


const runFactEngine = () => {
    const factStore = new FactStore();
    const parser = new Parser('in3.txt');
    for (const cmd of parser.commands()) {
        const op = cmd.getOperation();
        if (op === "INPUT") {
            factStore.input(cmd.getFact(), cmd.getArgs());
        } else {
            const result = factStore.query(cmd.getFact(), cmd.getArgs());
            result.logResult();
        }
    }
}

runFactEngine();