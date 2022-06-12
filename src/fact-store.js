
export class FactStore {
    constructor() {
        this.allTables = {};
        this.placeholderMap = {};
        this.hasPlaceholders = false;
        this.numPlaceholderSolutions = {};
    }

    getEntries(name) {
        return this.allTables[name];
    }

    addFact(name, args) {
        if (this.getEntries(name)) {
            this.getEntries(name).push(args);
        } else {
            this.allTables[name] = [args];
        }
    }

    isPlaceholder(field) {
        if (typeof field === 'string') {
            const firstChar = field.charAt(0);
            const isLetter = firstChar.toLowerCase() !== firstChar.toUpperCase();
            return isLetter && (firstChar === firstChar.toUpperCase());
        }
        return false;
    }

    arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false
        }
        return arr1.every((value, index) => value === arr2[index])
    }

    isMatch(name, query, entry) {
        const candidate = [];
        const tempPlaceholderVals = {};
        for (let i = 0; i < query.length; i++) {
            if (this.isPlaceholder(query[i])) {
                const placeholderName = query[i];
                if (tempPlaceholderVals[placeholderName]) {
                    candidate[i] = tempPlaceholderVals[placeholderName]
                } else {
                    candidate[i] = entry[i];
                    tempPlaceholderVals[placeholderName] = entry[i];
                }
            } else {
                candidate[i] = query[i];
            }
        }
        if (this.arraysEqual(candidate, entry)) {
            if (!this.hasPlaceholders) {
                return true;
            }
            this.incrementPlaceholderSolutions(name);
            for (let i = 0; i < query.length; i++) {
                if (this.isPlaceholder(query[i])) {
                    const placeholder = this.placeholderMap[query[i]];
                    placeholder.addValue(candidate[i]);
                }
            }
            return true;
        }
        return false;
    }

    incrementPlaceholderSolutions (name) {
        if (this.numPlaceholderSolutions[name]) {
            this.numPlaceholderSolutions[name] += 1;
        } else {
            this.numPlaceholderSolutions[name] = 1;
        }
    }

    query(name, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (this.isPlaceholder(arr[i])) {
                this.hasPlaceholders = true;
                const placeholder = new Placeholder(arr[i], i);
                this.placeholderMap[arr[i]] = placeholder;
            }
        }
        let matched = false;
        const entries = this.getEntries(name)
        for (let i = 0; i < entries.length; i++) {
            matched = this.isMatch(name, arr, entries[i]);
        }
        this.logOutput(name, matched);
    }

    logOutput(name, matchFound) {
        console.log('---');
        if (matchFound) {
            if (this.hasPlaceholders) {
                const numSolutions = this.numPlaceholderSolutions[name];
                for (let i = 0; i < numSolutions; i++) {
                    let output = '';
                    for (const [key, placeholder] of Object.entries(this.placeholderMap)) {
                        output += key + ': ' + placeholder.valueAt(i) + ' '
                    }
                    console.log(output);
                }
            } else {
                console.log(matchFound)
            }
        } else {
            console.log(false)
        }
    }
}

class Placeholder {
    constructor (name, position) {
        this.name = name;
        this.position = position;
        this.possibleValues = [];
    }

    name () {
        return this.name;
    }

    position () {
        return this.position;
    }

    valueAt (index) {
        return this.possibleValues[index];
    }

    addValue(val) {
        this.possibleValues.push(val)
    }
}