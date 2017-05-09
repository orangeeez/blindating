import { User } from '../models/user';
export class Feedback {
    id:                    number;
    remoteUserID:          number;
    informationFeedbackFK: number;
    text:                  string;
    result:                boolean;
    direction:             string;

    // NotMapped
    remoteUser:           User;
    remoteJWT:            string;
    remoteInfoFeedbackFK: number;
    isFirst: boolean;
    isLast:  boolean;
}