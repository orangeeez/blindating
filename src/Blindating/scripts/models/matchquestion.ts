export class MatchQuestion {
    id:       number;
    category: string;
    text:     string;

    constructor(id, category, text) {
        this.id       = id;
        this.category = category;
        this.text     = text;
    }
}