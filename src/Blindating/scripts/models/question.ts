export class Question {
    id:                    number;
    message:               string;
    informationQuestionFK: number;
    userID:                number;

    //not mapped
    answered: boolean;
    isEditing: boolean;
}