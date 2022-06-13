import { readFileSync } from 'fs';
import { resolve } from 'path';
import process from 'node:process';

export class Parser {
    constructor (filename) {
        const basedir = process.cwd();
        const filepath = resolve(basedir, 'examples', filename);
        const data = readFileSync(filepath, 'UTF-8');
        this.lines = data.split(/\r?\n/);
        this.allCommands = [];
        this.#parseLines()
    }

    #parseCommand (str) {
        const regex = /([A-Z]+)/;
        return str.match(regex)[1];
    }

    #parseArgs (str) {
        const regex = /\((.*)\)/;
        const match = str.match(regex)[1];
        return match.split(' ');
    }

    #parseFact (str) {
        const regex = /([a-z]+_[a-z]+)/;
        return str.match(regex)[1];
    }

    #parseLines () {
        for (const line of this.lines) {
            const op = this.#parseCommand(line);
            const fact = this.#parseFact(line);
            const args = this.#parseArgs(line);
            const cmd = new Command(op, fact, args);
            this.allCommands.push(cmd);
        }
    }

    commands() {
        return this.allCommands;
    }

}

export class Command {
    constructor(operation, fact, args) {
        this.operation = operation;
        this.fact = fact;
        this.args = args;
    }

    operation( ) {
        return this.operation;
    }

    fact () {
        return this.fact;
    }

    args () {
        return this.args;
    }
}