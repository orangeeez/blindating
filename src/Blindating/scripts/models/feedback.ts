import { User } from '../models/user';
export class Feedback {
    id:                    number;
    remoteUserID:          number;
    informationFeedbackFK: number;
    text:                  string;
    result:                boolean;
    direction:             string;

    // NotMapped
    remoteUser:            User;
    remoteInfoFeedbackFK:  number;
}