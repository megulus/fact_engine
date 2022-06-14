
import { QueryResult } from "./query-result.js";

export class FactStore {
    constructor() {
        this.allTables = {};
    }

    getFacts(name) {
        return this.allTables[name];
    }

    input(name, args) {
        if (this.getFacts(name)) {
            this.getFacts(name).push(args);
        } else {
            this.allTables[name] = [args];
        }
    }

    isPlaceholderArg (arg) {
        if (typeof arg === 'string') {
            const firstChar = arg.charAt(0);
            const isLetter = firstChar.toLowerCase() !== firstChar.toUpperCase();
            return isLetter && (firstChar === firstChar.toUpperCase());
        }
        return false;
    }

    isMatch(candidate, factArgs) {
        if (candidate.length !== factArgs.length) {
            return false
        }
        for (let i = 0; i < candidate.length; i++) {
            if (candidate[i] !== factArgs[i]) return false
        }
        return true
    }

    createCandidate (queryArgs, factArgs, boundPlaceholders) {
        const candidate = [];
        for (let i = 0; i < queryArgs.length; i++) {
            if (this.isPlaceholderArg(queryArgs[i])) {
                const placeholder = queryArgs[i];
                if (boundPlaceholders[placeholder]) {
                    candidate[i] = boundPlaceholders[placeholder];
                } else {
                    candidate[i] = factArgs[i];
                    boundPlaceholders[placeholder] = factArgs[i];
                }
            } else {
                candidate[i] = queryArgs[i];
            }
        }
        return candidate;
    }

    query(assertion, queryArgs) {
         const result = new QueryResult(assertion, queryArgs);
        const facts = this.getFacts(assertion);
         if (!facts) {
            result.addResult(false, {});
            return result;
        }
        for (let i = 0; i < facts.length; i++) {
            const boundPlaceholders = {};
            const factArgs = facts[i];
            const candidate = this.createCandidate(queryArgs, factArgs, boundPlaceholders);
             const matched = this.isMatch(candidate, factArgs);
            result.addResult(matched, boundPlaceholders);
        }
        return result;
    }
}

