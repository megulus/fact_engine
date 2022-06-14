
export class QueryResult {
    constructor(assertion, queryArgs) {
        this.assertion = assertion;
        this.queryArgs = queryArgs;
        // this.hasPlaceholders = false;
        //this.numPlacholderResults = 0;
        this.booleanResult = undefined;
        this.bindings = []

        // this.queryArgs.forEach((arg) => {
        //     if (this.#isPlaceholderArg(arg)) this.hasPlaceholders = true;
        // });
    }

    addResult (isMatch, boundPlaceholders) {
        const placeholders = Object.keys(boundPlaceholders)
        if (isMatch) {
            if (placeholders.length === 0) {
                this.booleanResult = true
            } else {
                this.bindings.push(boundPlaceholders)
            }
        } else {
            this.booleanResult = false
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

    logResult () {
        console.log('---');
        if (this.bindings.length > 0) {
            for (let i = 0; i < this.bindings.length; i++) {
                const result = this.bindings[i]
                let output = ''
                for (const [placeholder, value] of Object.entries(result)) {
                    output += placeholder + ': ' + value + ' ';
                }
                console.log(output);
            }
        } else {
            console.log(this.booleanResult);
        }
    }
}

// class Placeholder {
//     constructor (name) {
//         this.name = name;
//         this.boundValues = [];
//     }
//
//     name () {
//         return this.name;
//     }
//
//     valueAt (index) {
//         return this.boundValues[index];
//     }
//
//     addValue(val) {
//         this.boundValues.push(val)
//     }
// }