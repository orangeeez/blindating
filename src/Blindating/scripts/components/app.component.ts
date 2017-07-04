import {
    OnInit,
    Component,
    ViewChild,
    NgZone,
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
import { Message }              from '../models/message';
import { Conversation }         from '../models/conversation';
import { Utils, DataSignals }   from '../static/utils';
import { FooterComponent }      from '../components/footer.component';
import { HeaderComponent }      from '../components/header.component';
import { HelperComponent }      from '../components/helper.component';
import { LoginComponent }       from '../components/router-outlet/login.component';
import { ProfilemenuComponent } from '../components/profilemenu.component';
import { DashboardComponent }   from '../components/router-outlet/dashboard.component';
import { TalkComponent }        from '../components/router-outlet/talk.component';

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
            transition('deselected => selected', animate('200ms ease-in')),
            transition('selected => deselected', animate('200ms ease-out'))
        ])
    ]
})
export class AppComponent implements OnInit {
    @ViewChild(FooterComponent)      public _footer: FooterComponent;
    @ViewChild(HeaderComponent)      public _header: HeaderComponent;
    @ViewChild(HelperComponent)      public _helper: HelperComponent;
    @ViewChild(DashboardComponent)   public _dashboard: DashboardComponent;
    @ViewChild(ProfilemenuComponent) public _profilemenu: ProfilemenuComponent;
    @ViewChild(TalkComponent)        public _talk: TalkComponent;

    public server:       string  = 'http://localhost:8001';
    public stun:         string  = 'stun:stun.l.google.com:19302';
    public stream:       any;
    public localStream:  any;
    public remoteStream: any;

    public user:         User;
    public users:        User[];
    public selectedUser: User = null;
    public callingUser:  User;
    public callerUser:   User;
    public communicationUser: User;

    public videoState:         string = 'none';
    public communicationState: string = 'none';

    public isHelperShow:  boolean = false;
    public isHeaderShow:  boolean = false;
    public isLoginShow:   boolean = true;
    public isPickupShow:  boolean = false;
    public isSelectedYou: boolean = false;

    constructor(
        private _userService:         UserService,
        private _conversationService: ConversationService,
        private _zone:                NgZone,
        private _router:              Router) { }

    ngOnInit() {
        this.isLoginShow = !Boolean(localStorage.getItem('id_token'));
    }

    public selectDeselectUser(user: User, isToggle: boolean = true): void {
        if (this.selectedUser == user) {
            this.selectedUser = null;
            this._profilemenu.toggleState();
        }
        else if (this.selectedUser == null) {
            this.selectedUser = user;
             if (isToggle) this._profilemenu.toggleState();
        }
        else if (this.selectedUser != user) {
            this.selectedUser = user;
            this._header.isProfileActive = false;
        }

        this.isSelectedUserYou();
        this.setHelperElements();
        this.setHeaderElements(user);
        this.setProfilemenuElements();
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

        this.user.peer.on('chat-accepted',   this.onCallAccepted);

        this.user.peer.on('data-received',  this.onDataReceived);

        this.user.peer.on('chat-started',   this.onCallStarted);

        this.user.peer.on('chat-stopped',   this.onCallStopped);

        this.user.peer.on('chat-denied',    this.onCallDenied);

        this.user.peer.on('stream-added',   this.onStreamAdded);

        this.user.peer.on('stream-removed', this.onStreamRemoved)
    }

    private onUserCalling = (e): void => {
        this._userService.GetCalling(e.senderId)
            .subscribe(caller => {
                this.callerUser              = caller;
                this.communicationState      = 'calling';
                this._helper.phoneIcon       = PHONE;
                this._helper.isPhoneDisabled = false;
                this._helper.intervalCalling = setInterval(this._helper.onCallingBlink, 500);
            });
    }

    private onCallAccepted = (e): void => {} 

    private onDataReceived = (e): void => {
        if (e.data == DataSignals.RequestingVideo) {
            this._helper.intervalVideoing = setInterval(this._helper.onVideoingBlink, 500);
            this.videoState = 'videoRequesting';
            this._helper.isVideoRequested = true;
        }

        if (e.data == DataSignals.DenyingVideo) {
            this._helper.denyVideoIcon();
        }

        if (Utils.IsJSON(e.data)) {
            if (e.data.includes('"type":"message"')) {
                var message = <Message>JSON.parse(e.data);
                message.whose = 'message-you';
                this._zone.run(() => this._talk.messages.push(message));
            }
        }

        //if (Utils.IsJSON(e.data)) {
        //    this._zone.run(() => this._talk.sketchCanvas.nativeElement.data().sketch.actions.push(JSON.parse(e.data)));
        //}
    }

    private onCallStarted = (e): void => {
        if (this.communicationState == 'caller')
            this.communicationState = 'initiatedCaller';

        this.communicationUser = this.defineCommunicationUser();

        if (!this.selectedUser) this.selectDeselectUser(this.communicationUser);

        this._helper.enableAudio();

        this.isHeaderShow = true;
        this._router.navigate(['/talk']);
        this._helper.isCallInitiated   = true;
        this._helper.startDurationTime = new Date();
        this._helper.intervalDuration  = setInterval(this._helper.startDuration, 1000);

        clearInterval(this._helper.intervalCalling);
    }

    public onCreateStream = (err, stream): void => {
        this.localStream = stream;

        this.user.peer.publish(this.localStream, this.communicationUser.jwt);
    }

    private onCallStopped = (e): void => {
        console.log('CALL STOPED');
        console.log(this.localStream);
        console.log(this.remoteStream);

        this._helper.isCallInitiated = false;
        this._helper.isCallDenied = true;
        this._helper.isVideoRequested = false;

        if (this.localStream)
            this.localStream.close();

        if (this.remoteStream)
            this.remoteStream.close();

        this.localStream  = undefined;
        this.remoteStream = undefined;

        setTimeout(this.disapearCall, 2000);

        //this._conversationService.Add(this.createConversation())
        //    .subscribe(progress => {
        //        this.user.progress = progress;
        //    });
    }

    private onCallDenied = (e): void => {
        this._helper.isCallDenied = true;
        setTimeout(this.disapearCall, 2000);
    }

    private onStreamAdded = (e): void => {
        this.remoteStream = e.stream;

        if (this.videoState == 'videoRequester') {
            this.videoState = 'initiatedVideo';
            this._helper.onAcceptVideo();
        }
    } 

    private onStreamRemoved = (e): void => {}

    public disapearCall = (): void => {
        this.callerUser           = null;
        this.callingUser          = null;
        this.videoState           = 'none';
        this.communicationState   = 'none';

        this._helper.isVideoing   = false;
        this._helper.isCallDenied = false;

        this._helper.duration          = '00:00';
        this._helper.durationTime      = new Date(0, 0, 0, 0, 0, 0, 0);
        this._helper.cleanVideoIcon();

        if (this.selectedUser) this.selectDeselectUser(this.selectedUser);

        this._router.navigate(['/dashboard']);

        clearInterval(this._helper.intervalCalling);
        clearInterval(this._helper.intervalDuration);
        clearInterval(this._helper.intervalVideoing);
    } 

    public isSelectedUserYou(): void {
        if (!this.selectedUser)
            this.isSelectedYou = false;
        else
            this.isSelectedYou = this.user.id == this.selectedUser.id;
    }

    private setHelperElements(): void {
        if (this.selectedUser         && 
            !this.selectedUser.online && 
            !this.isSelectedYou) {
                this._helper.phoneIcon = PHONE_INACTIVE;
                this._helper.isPhoneDisabled = true;
        }
    }

    private setHeaderElements = (user: User): void => {
        if (this.user.id == user.id)
            this._header.isProfileActive = !this._header.isProfileActive;

        if (this._header.notificationCount == 0)
            this._profilemenu.setBasicTabActive();
        else
            this._profilemenu.setNotificationTabActive();
    }

    private setProfilemenuElements = (): void => {
        if (this.isSelectedYou)
            this._profilemenu.enableTab('Notifications');

        if (!this.isSelectedYou)
            this._profilemenu.disableTab('Notifications');
    }

    private createConversation = (isFirst?: boolean): Conversation => {
        var conversation              = new Conversation();
        conversation.userID           = this.user.id;
        conversation.remoteUserID     = this.callerUser ? this.callerUser.id : this.callingUser.id;
        conversation.start            = this._helper.startDurationTime.toLocaleString();
        conversation.end              = new Date().toLocaleString();
        conversation.duration         = this._helper.duration;
        conversation.isVideoInitiated = this._helper.isVideoInitiated;
        conversation.direction        = this.communicationState;
        conversation.informationConversationFK = this.user.information['id'];
        return conversation;
    }

    private defineCommunicationUser = (): User => {
        var user: User;

        if (this.communicationState == 'initiatedCalling')
            user = this.callerUser;
        else if (this.communicationState == 'initiatedCaller')
            user = this.callingUser;

        return user;
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
