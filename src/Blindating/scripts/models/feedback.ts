import { User } from '../models/user';
export class Feedback {
    id:                    number;
    informationFeedbackFK: number;
    text:                  string;
    video:                 string;
    audio:                 string;
    userID:                number;
    remoteUser:            User;
    remoteUserID:          number;
    isPositive:            boolean;
}