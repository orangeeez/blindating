import { User } from '../models/user';
export class Conversation {
    id:               number;
    start:            string;
    end:              string;
    duration:         string;
    remoteUser:       User;
    remoteUserID:     number;
    isVideoInitiated: boolean;
    userID:           number;
    direction:        string;
    informationConversationFK: number;

    //not mapped
    isFirst: boolean = false;
}