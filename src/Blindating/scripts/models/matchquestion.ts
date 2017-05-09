import { MatchAnswer } from './matchanswer';
export class MatchQuestion {
    id:                  number;
    category:            string;
    text:                string;
    matchAnswers:        MatchAnswer[];
    matchAnswerID:       number;
    remoteMatchAnswerID: number;
    isAnswered:          boolean;

    constructor(id, category, text) {
        this.id       = id;
        this.category = category;
        this.text     = text;
    }
}