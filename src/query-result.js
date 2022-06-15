
export class QueryResult {
    constructor() {
        this.booleanResult = undefined;
        this.bindings = []
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