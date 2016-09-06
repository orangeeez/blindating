import {Component, OnInit, Host, Inject, forwardRef} from 'angular2/core'
import {User}              from './user'
import {UserService}       from './user.service'
import {Utils}       from './utils/utils'
import {AppComponent}      from './app.component'

@Component({
    selector: 'helper',
    templateUrl: 'app/helper.component.html',
    styleUrls: ['app/helper.component.css', 'app/search.component.css'],
    inputs: ['phoneIconPath', 'phoneHangupIconPath']
})

export class HelperComponent implements OnInit {
    public app: AppComponent;
    public phoneIconPath: String;
    public phoneHangupIconPath: String;
    public isPhoneDisabled: boolean = true;
    public isPhoneHangupDisabled: boolean = true;
    public isPhoneClassEnabled: boolean = false;
    public isPhoneHangupClassEnabled: boolean = false;
    public isCallingBlink: boolean = true;
    public isCallInitiated: boolean = false;
    public isCallDenied: boolean = false;
    public interval: any;
    public callingInterval: any;
    public durationTimeout: any;
    public startDurationTime: Date = new Date(0, 0, 0, 0, 0, 0, 0);
    public startConversationTime: Date;
    public duration: string;

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _userService: UserService) {
        this.app = app;
    }

    ngOnInit() {}

    private onPhoneMouseOver = () => {}

    public inviteAcceptCall() {
        if (this.app.communicationState == 'calling') {
            this.app.user.Peer.accept(this.app.callingUser.JWT);
            this.app.communicationState = 'initiatedCalling';
            this.isCallInitiated = true;
            this.startDuration();
            this.app._helperComponent.startConversationTime = new Date();
            clearInterval(this.callingInterval);
        }
        else {
            this.app.user.Peer.invite(this.app.selectedUser.JWT, function () { }, function (err) { });
            this.app.callerUser = this.app.selectedUser;
            this.app.communicationState = 'caller';
            this.phoneHangupIconPath = "images/app/controls/phone-hang-up.png"
            this.isPhoneHangupDisabled = false;
            this.isPhoneHangupClassEnabled = true;
            this.interval = setInterval(this.onCallingBlink, 500);
        }
        //this.app.user.Peer.send('abc', this.app.selectedUser.JWT); 
    }

    public denyCall = () => {
        if (this.app.communicationState == 'calling')
            this.app.user.Peer.deny(this.app.callingUser.JWT);

        if (this.app.communicationState == 'initiatedCalling')
            this.app.user.Peer.stop(this.app.callingUser.JWT);

        if (this.app.communicationState == 'initiatedCaller')
            this.app.user.Peer.stop(this.app.callerUser.JWT);

        this.isCallDenied = true;
        setTimeout(this.disappearCall, 2000);
    }

    public onCallingBlink = () => {
        if (this.isCallingBlink) this.isCallingBlink = false;
        else  this.isCallingBlink = true;
    }

    public startDuration = () => {
        var h = this.startDurationTime.getHours();
        var m = this.startDurationTime.getMinutes();
        var s = this.startDurationTime.getSeconds();
        this.startDurationTime.setSeconds(s + 1)
        h = Utils.CheckTime(h);
        m = Utils.CheckTime(m);
        s = Utils.CheckTime(s);

        h.valueOf() != 0 ? this.duration = h + ":" + m + ":" + s :
                           this.duration = m + ":" + s;

        this.durationTimeout = setTimeout(this.startDuration, 1000);
    }

    public disappearCall = () => {
        this.app.callerUser = null;
        this.app.callingUser = null;
        this.app.communicationState = 'none';
        this.isCallInitiated = false;
        this.isCallDenied = false;
        this.startDurationTime = new Date(0, 0, 0, 0, 0, 0, 0);
        clearInterval(this.callingInterval);
        clearTimeout(this.durationTimeout);
    }
}