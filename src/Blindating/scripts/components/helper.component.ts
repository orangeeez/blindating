import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef
}                             from '@angular/core';
import {
    HANGUP,
    HANGUP_INACTIVE,
    PHONE,
    PHONE_INACTIVE,
    VIDEO,
    VIDEO_INACTIVE
}                             from '../static/config';
import { Utils, DataSignals } from '../static/utils';
import { AppComponent }       from '../components/app.component';
import { UserService }        from '../services/user.service';
declare var Woogeen:          any;
@Component({
    selector:    'helper-component',
    templateUrl: 'app/components/helper.component.html',
    styleUrls:  ['app/components/helper.component.css'],
    inputs:     ['app']
})
export class HelperComponent implements OnInit {
    public app: AppComponent;

    public phoneIcon:  string = PHONE;
    public hangupIcon: string = HANGUP;
    public videoIcon:  string = VIDEO;

    public isCalling:        boolean = true;
    public isCallInitiated:  boolean = false;
    public isCallDenied:     boolean = false;
    public isVideoing:       boolean = false;
    public isVideoInitiated: boolean = false;
    public isVideoDenied:    boolean = false;

    public isPhoneDisabled: boolean = false;

    public intervalCalling:   any;
    public intervalVideoing:  any;
    public intervalDuration:  any;

    public duration:          any;
    public durationTime:      Date = new Date(0, 0, 0, 0, 0, 0, 0);
    public startDurationTime: Date;

    constructor(private _userService: UserService,
                private _ref: ChangeDetectorRef) { }

    ngOnInit() { }

    public onInviteAcceptCall(): void {
        if (this.app.communicationState == 'calling') {
            this.app.user.peer.accept(this.app.callerUser.jwt);
            this.app.communicationState = 'initiatedCalling';
        }
        else {
            this.app.user.peer.invite(this.app.selectedUser.jwt);
            this.app.callingUser = this.app.selectedUser;
            this.app.communicationState = 'caller';
            this.intervalCalling = setInterval(this.onCallingBlink, 500);
        }
    }

    public onDenyCall(): void {
        if (this.app.communicationState == 'calling') {
            this.app.user.peer.deny(this.app.callerUser.jwt);
            this.isCallDenied = true;
            setTimeout(this.app.disapearCall, 2000);
            clearInterval(this.intervalVideoing);
        }
        else 
            this.denyCall(this.app.communicationUser.jwt);
    }

    public onCallingBlink = (): void => {
        this.isCalling = !this.isCalling;
        this._ref.detectChanges();
    }

    public onVideoingBlink = (): void => {
        this.isVideoing = !this.isVideoing;
        this._ref.detectChanges();
    }

    public startDuration = (): void => {
        var h = this.durationTime.getHours();
        var m = this.durationTime.getMinutes();
        var s = this.durationTime.getSeconds();
        this.durationTime.setSeconds(s + 1)
        h = Utils.CheckTime(h);
        m = Utils.CheckTime(m);
        s = Utils.CheckTime(s);

        h.valueOf() != 0 ? this.duration = h + ":" + m + ":" + s :
            this.duration = m + ":" + s;

        this._ref.detectChanges();
    }

    public onRequestVideo = () => {
        this.app.user.peer.send(DataSignals.RequestingVideo, this.app.communicationUser.jwt)
        this.intervalVideoing = setInterval(this.onVideoingBlink, 500);
        this.app.videoState = 'videoRequester';
    }

    public onAcceptVideo = () => {
        this.app.videoState = 'initiatedVideo';
        this.cleanVideoIcon();
        this.isVideoInitiated = true;
        this.disableAudio();
        this.enableVideo();
    }

    private onDenyVideo = () => {
        this.app.user.peer.send(DataSignals.DenyingVideo, this.app.communicationUser.jwt);
        this.denyVideoIcon();
    }

    private disableAudio = () => {
        this.app.user.peer.unpublish(this.app.localStream, this.app.communicationUser.jwt);
        
        this.app.localStream.close();
        this.app.localStream = undefined;
    } 

    private enableVideo = () => {
        Woogeen.LocalStream.create({
            video: {
                device: "camera",
                resolution: "hd720p",
                frameRate: [30, 30]
            },
            audio: true
        }, this.app.onCreateStream);
    }

    private denyCall = (jwt: string) => {
        this.app.user.peer.stop(jwt);
    }

    public denyVideoIcon = () => {
        this.app.videoState = 'none';
        this.isVideoDenied  = true;
        setTimeout(() => {
            this.isVideoDenied = false;
            this.isVideoing    = false;
            clearInterval(this.intervalVideoing);
        }, 2000);
    }

    public cleanVideoIcon = () => {
        this.isVideoDenied    = false;
        this.isVideoInitiated = false;
        this.isVideoing       = false;
        clearInterval(this.intervalVideoing);
    }
}
