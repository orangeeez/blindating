import { User } from '../models/user';
export class Conversation {
    id:           number;
    start:        string;
    end:          string;
    duration:     string;
    remoteUser:   User;
    remoteUserID: number;
    userID:       number;
    informationConversationFK: number;
}