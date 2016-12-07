import { User } from '../models/user';
export class Feedback {
    id:                    number;
    informationFeedbackFK: number;
    text:                  string;
    video:                 string;
    audio:                 string;
    userID:                number;
    remoteUserID:          number;
    isPositive:            boolean;
    Direction:             string;
    user:                  User;
    remoteUser:            User;
}