export class Question {
    id:                    number;
    userID:                number;
    informationQuestionFK: number;
    message:               string;

    //not mapped
    answered:     boolean;
    isEditing:    boolean;
    answersCount: number;
    isFirst:      boolean;
    isLast:       boolean;
}