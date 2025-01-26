function solution(queries) {
    const doc = new Document();
    queries.forEach((query) => doc.processQuery(query));
    console.log(doc);
    return doc.history;
}

class Document {

    cursorIndex = 0;
    currentBody = '';
    history = [];

    processQuery(query) {
        const [ operation, value ] = query;
        switch (operation) {
            case 'APPEND':
                console.log('before append', this.currentBody, this.cursorIndex)
                this.append(value);
                console.log('after append', this.currentBody, this.cursorIndex)
                break;
            case 'MOVE':
                console.log('before move', this.cursorIndex);
                this.move(value);
                console.log('after move', this.cursorIndex);
                break;
            case 'BACKSPACE':
                this.back();
                break;
            default:
                console.log(`Query ${operation} operation not yet supported.`);
                break;
        }
        const nextVersion = this.currentBody;
        this.history.push(nextVersion);
    }

    /**
     * Appends a string of text to current doc body at current cursor position
     * Moves cursor to end of appended text in body
     */
    append(text) {
        if (text.length === 0) return;

        // handle cursor at front of doc body
        const start = this.cursorIndex > 0 ? this.cursorIndex + 1: 0;
        const end = this.cursorIndex > 0 ? this.cursorIndex + 1: 0;

        const preBody = this.currentBody.slice(0, start);
        const postBody = this.currentBody.slice(end);

        this.currentBody = `${preBody}${text}${postBody}`;
        this.cursorIndex = (preBody.length - 1) + text.length;
    }

    /**
     * Moves cursor to provided position, assuming a 0-indexed string enumeration of doc body
     * if out of bounds, find nearest neighbor
     */
    move(position) {
        // coerce to number type
        position = +position;

        const charAtPosition = this.currentBody[position];
        const finalPosition = this.currentBody.length > 0 ? (this.currentBody.length - 1): 0;

        // position outside of current body
        if (charAtPosition === undefined) {
            if (position > finalPosition) {
                this.cursorIndex = finalPosition;
            }
            if (position < 0) {
                this.cursorIndex = 0;
            }
        } else {
            // happy path
            this.cursorIndex = position;
        }

    }

    /**
     * Delete the character before the cursor
     * update cursor accordingly
     */
    back() {
        const nextCursor = this.cursorIndex - 1;

        // remove char
        const nextBody = this.currentBody.split('');
        nextBody.splice(this.cursorIndex, 1);

        this.currentBody = nextBody.join('');
        this.cursorIndex = nextCursor;
    }
}
