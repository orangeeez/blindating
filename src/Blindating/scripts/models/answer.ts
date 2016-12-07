import { User } from './user';
export class Answer {
    id:            number;
    result:        boolean;
    userID:        number;
    remoteUserID:  number;
    message:       string;
    informationFK: number;

    user: User;
}