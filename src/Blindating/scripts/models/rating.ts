export class Rating {
    id: number;
    informationRatingFK: number;
    grade: number;
    count: number;

    //not mapped
    isFirst: boolean;
    isLast:  boolean;
}