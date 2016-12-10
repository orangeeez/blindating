export class Question {
    id:                    number;
    message:               string;
    informationQuestionFK: number;
    userid:                number;
    isEditing:             boolean;

    //not mapped
    answered: boolean;
}