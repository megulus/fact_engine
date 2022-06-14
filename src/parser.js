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
        const match = str.match(regex);
        if (match && match.length > 0) {
            return match[1];
        }
        return null;
    }

    #parseArgs (str) {
        str = str.replaceAll(',', '');
        const regex = /\((.*)\)/;
        const match = str.match(regex)[1];
        if (match) {
            return match.split(' ');
        }
        return null;
    }

    #parseFact (str) {
        const regex = /(?!\()([a-z]+[_]*)+\s/;
        const match = str.match(regex)
        if (match && match.length > 0) {
            return match[0].trim()
        }
        return null;
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

    getOperation () {
        return this.operation;
    }

    getFact () {
        return this.fact;
    }

    getArgs () {
        return this.args;
    }
}