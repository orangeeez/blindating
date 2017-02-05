export class Question {
    id:                    number;
    message:               string;
    informationQuestionFK: number;
    userID:                number;
    isEditing:             boolean;

    //not mapped
    answered: boolean;
}