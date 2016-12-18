export class Quote {
    id:                 number;
    author:             string;
    content:            string;
    up:                 number;
    down:               number;
    informationQuoteFK: number;

    userid:             number;
    isEditing:          boolean;
    isAnswered:         boolean;
    isLike:             boolean;
    isDislike:          boolean;
}