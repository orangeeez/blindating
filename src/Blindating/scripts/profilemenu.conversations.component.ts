import {Component, ViewChild, OnInit, Host, Inject, forwardRef, EventEmitter} from 'angular2/core'
import {AppComponent}        from './app.component'
import {UserService}         from './user.service'
import {SocialService}       from './services/social.service'
import {UserInfoService}     from './services/userinfo.service'
import {User}                from './user'
import {Conversation}              from './utils/user.utils'

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
    constructor() {}

    ngOnInit() {
        this.app.updateConversationsData(this.conversations);
        //for (let c of this.conversations) {
        //    let start = new Date(Date.parse(c.Start.toString()));
        //    let end = new Date(Date.parse(c.Start.toString()));

        //    c.StartString = start.getFullYear() + '/' + start.getMonth() + '/' + start.getDate();
        //    c.EndString = end.getFullYear() + '/' + end.getMonth() + '/' + end.getDate();
        //}
    }

    public back() {
        this.onBack.emit([]);
    }
}