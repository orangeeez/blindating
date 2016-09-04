import {Quote, Photo, Conversation, Preference, Question, Answer, Notification}          from './../utils/user.utils'
import {Profilemenu} from './../utils/component.utils'

export class SaveComponentService {
    public profilemenu: Profilemenu;
    public notificationHTML: Array<any> = [];
    public isProfilemenuSaved: boolean = false;
    constructor() { }

    SaveProfilemenu(profilemenu: Profilemenu) {
        this.profilemenu = profilemenu;
        this.isProfilemenuSaved = true;
    }

    LoadProfilemenu(): Profilemenu {
        return this.profilemenu;
    }
}