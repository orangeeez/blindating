import {
    OnInit,
    Component,
    ViewChild,
    trigger,
    state,
    style,
    transition,
    animate
}                               from '@angular/core';
import {
    HANGUP,
    HANGUP_INACTIVE,
    PHONE,
    PHONE_INACTIVE
}                               from '../static/config';
import { Router }               from '@angular/router';
import { UserService }          from '../services/user.service';
import { ConversationService }  from '../services/information/conversation.service';
import { User }                 from '../models/user';
import { Photo }                from '../models/photo';
import { Conversation }         from '../models/conversation';
import { Utils }                from '../static/utils';
import { FooterComponent }      from '../components/footer.component';
import { HeaderComponent }      from '../components/header.component';
import { HelperComponent }      from '../components/helper.component';
import { LoginComponent }       from '../components/router-outlet/login.component';
import { ProfilemenuComponent } from '../components/profilemenu.component';
declare var PhotoSwipe, PhotoSwipeUI_Default;
declare var Woogeen: any;
@Component({
    selector:    'blindating',
    templateUrl: 'app/components/app.component.html',
    styleUrls:   ['app/components/app.component.css'],
    animations:  [
        trigger('profilemenuState', [
            state('deselected', style({
                width: '8.3%'
            })),
            state('selected', style({
                width: '30%'
            })),
            transition('deselected => selected', animate('100ms ease-in')),
            transition('selected => deselected', animate('100ms ease-out'))
        ])
    ]
})
export class AppComponent implements OnInit {
    @ViewChild(FooterComponent)      public _footer: FooterComponent;
    @ViewChild(HeaderComponent)      public _header: HeaderComponent;
    @ViewChild(HelperComponent)      public _helper: HelperComponent;
    @ViewChild(ProfilemenuComponent) public _profilemenu: ProfilemenuComponent;

    public server:   string  = 'http://192.168.0.114:8095';
    public stun:     string  = 'stun:stun.l.google.com:19302';
    public stream:    any;

    public user:         User;
    public users:        User[];
    public selectedUser: User = null;
    public callingUser:  User;
    public callerUser:   User;

    public communicationState: string = 'none';

    public isHelperShow:  boolean = false;
    public isHeaderShow:  boolean = false;
    public isSelectedYou: boolean = false;

    constructor(
        private _userService:         UserService,
        private _conversationService: ConversationService,
        private _router:      Router) { }

    ngOnInit() {
        this._helper.intervalDuration = setInterval(this.startDuration, 1000);
    }

    public selectDeselectUser(user: User): void {
        if (this.selectedUser == user) {
            this.selectedUser = null;
            this._profilemenu.ToggleState();
        }
        else if (this.selectedUser == null) {
            this.selectedUser = user;
            this._profilemenu.ToggleState();
        }
        else if (this.selectedUser != user) {
            this.selectedUser = user;
            this._header.isProfileActive = false;
        }

        if (!this.selectedUser)
            this.isSelectedYou = false;
        else
            this.isSelectedYou = this.user.id == this.selectedUser.id;

        this.setHelperElements();
    }

    public initializeWebRTC() {
        this.user.peer = new Woogeen.PeerClient({
            iceServers: [{
                urls: this.stun
            }]
        });
        this.user.peer.connect({
            host: this.server, token: this.user.jwt
        });

        this.user.peer.on('chat-invited',   this.onUserCalling);

        this.user.peer.on('data-received',  this.onDataReceived);

        this.user.peer.on('chat-started',   this.onCallStarted);

        this.user.peer.on('chat-stopped',   this.onCallStopped);

        this.user.peer.on('chat-denied',    this.onCallDenied);

        this.user.peer.on('stream-added',   this.onStreamAdded);

        this.user.peer.on('stream-removed', this.onStreamRemoved)
    }

    private onUserCalling = (e): void => {
        this._userService.GetBy("JWT", e.senderId)
            .subscribe(caller => {
                this.callerUser              = caller;
                this.communicationState      = 'calling';
                this._helper.phoneIcon       = PHONE;
                this._helper.isPhoneDisabled = false;
                this._helper.intervalCalling = setInterval(this._helper.onCallingBlink, 500);
            });
    }

    private onDataReceived = (): void => { }

    private onCallStarted = (e): void => {
        if (this.communicationState == 'caller') {
            this.communicationState = 'initiatedCaller';

            Woogeen.LocalStream.create({
                audio: true
            }, this.onCreateStream);
        }

        this._router.navigate(['/talk']);
        this._helper.isCallInitiated = true;
        this._helper.startDurationTime = new Date();
        clearInterval(this._helper.intervalCalling);
    }

    private onCreateStream = (err, stream) => {
        this.stream = stream;
        this.user.peer.publish(this.stream, this.callingUser.jwt);
    }

    private onCallStopped = (e): void => {
        this._helper.isCallInitiated = false;
        this._helper.isCallDenied = true;

        this.stream.close();
        this.stream = undefined;

        setTimeout(this.disapearCall, 2000);

        this._conversationService.Add(this.createConversation()).subscribe();
    }

    private onCallDenied = (e): void => {
        this._helper.isCallDenied = true;
        setTimeout(this.disapearCall, 2000);
    }

    private onStreamAdded = (e): void => {
        this.stream = e.stream;
    } 

    private onStreamRemoved = (e): void => { }

    public disapearCall = (): void => {
        this.callerUser           = null;
        this.callingUser          = null;
        this.communicationState   = 'none';

        this._helper.isCallDenied      = false;
        this._helper.duration          = '00:00';
        this._helper.durationTime      = new Date(0, 0, 0, 0, 0, 0, 0);
        this._router.navigate(['/dashboard']);

        clearInterval(this._helper.intervalCalling);
    } 

    private setHelperElements(): void {
        if (this.selectedUser && !this.selectedUser.online && !this.isSelectedYou) {
            this._helper.phoneIcon = PHONE_INACTIVE;
            this._helper.isPhoneDisabled = true;
        }
    }

    private createConversation = (): Conversation => {
        var conversation          = new Conversation();
        conversation.userID       = this.user.id;
        conversation.remoteUserID = this.callerUser ? this.callerUser.id : this.callingUser.id;
        conversation.start        = this._helper.startDurationTime.toLocaleString();
        conversation.end          = new Date().toLocaleString();
        conversation.duration     = this._helper.duration;
        conversation.informationConversationFK = this.user.information['id'];
        return conversation;
    }

    public startDuration = () => {
        if (this.communicationState == 'initiatedCaller' || this.communicationState == 'initiatedCalling') {
            var h = this._helper.durationTime.getHours();
            var m = this._helper.durationTime.getMinutes();
            var s = this._helper.durationTime.getSeconds();
            this._helper.durationTime.setSeconds(s + 1)
            h = Utils.CheckTime(h);
            m = Utils.CheckTime(m);
            s = Utils.CheckTime(s);

            h.valueOf() != 0 ? this._helper.duration = h + ":" + m + ":" + s :
                               this._helper.duration = m + ":" + s;
        }
    }

    public openGallery(photos: Photo[], number: number = 0): void {
        var fitted = this.fitPhotos(photos);
        var pswpElement = document.querySelectorAll('.pswp')[0];
        var options = {
            index: number,
            history: false,
            focus: false,
            showAnimationDuration: 0,
            hideAnimationDuration: 0
        };
        new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, fitted, options).init();
    }

    private fitPhotos(photos: Photo[]): Photo[] {
        let items: Array<any> = [];
        for (let photo of photos) {
            items.push({
                src: photo.path,
                w: photo.width,
                h: photo.height
            })
        }
        return items;
    }
}
