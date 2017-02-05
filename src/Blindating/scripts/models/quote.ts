export class Quote {
    id:                 number;
    author:             string;
    content:            string;
    up:                 number;
    down:               number;
    informationQuoteFK: number;
    userID:             number;
    isEditing:          boolean;
    isAnswered:         boolean;
    isLike:             boolean;
    isDislike:          boolean;
}