import {Component, ViewChild, OnInit, Host, Inject, forwardRef, EventEmitter} from 'angular2/core'
import {AppComponent}        from './app.component'
import {UserService}         from './user.service'
import {SocialService}       from './services/social.service'
import {UserInfoService}     from './services/userinfo.service'
import {User}                from './user'
import {Conversation}              from './utils/user.utils'
import {Utils}              from './utils/utils'


declare var PhotoSwipe, PhotoSwipeUI_Default;

@Component({
    selector: 'profilemenu-conversations',
    templateUrl: 'app/profilemenu.conversations.component.html',
    styleUrls: ['app/profilemenu.conversations.component.css', 'app/profilemenu.component.css', 'app/search.component.css'],
    inputs: ['app', 'conversations'],
    outputs: ['onBack']
})

export class ProfileMenuConversationsComponent implements OnInit {
    public onBack = new EventEmitter();
    public headerUndoIconPath = "/images/app/controls/undo.png";

    public app: AppComponent;
    public conversations: Array<Conversation>;
    public months: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    public days: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    constructor() {}

    ngOnInit() {
        this.updateConversationsData(this.conversations);
    }

    public back() {
        this.onBack.emit([]);
    }

    public updateConversationsData(conversations: Array<Conversation>) {
        for (let c of conversations) {
            let start = new Date(Date.parse(c.Start.toString()));
            let end = new Date(Date.parse(c.End.toString()));

            c.DateString = this.days[start.getDay()] + ', ' + this.months[start.getMonth()] + ' ' + start.getDate();
            c.TimeString = Utils.CheckTime(start.getHours()) + ":" + Utils.CheckTime(start.getMinutes());
        }
    }
}