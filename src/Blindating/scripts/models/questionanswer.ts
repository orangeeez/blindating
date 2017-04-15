import { User } from './user';
export class QuestionAnswer {
    id:               number;
    result:           boolean;
    remoteUserID:     number;
    questionAnswerFK: number;
    direction:        string;

    // NotMapped
    informationQuestionFK: number;
    remoteInfoQuestionFK: number;
    remoteUser:       User;
    questionAnswered: string;

}