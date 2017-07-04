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
    selector: 'helper-component',
    templateUrl: 'app/components/helper.component.html',
    styleUrls: ['app/components/helper.component.css'],
    inputs: ['app']
})
export class HelperComponent implements OnInit {
    public app: AppComponent;

    public phoneIcon: string = PHONE;
    public hangupIcon: string = HANGUP;
    public videoIcon: string = VIDEO;

    public isCalling: boolean        = false;
    public isCallInitiated: boolean  = false;
    public isCallDenied: boolean     = false;
    public isVideoing: boolean       = false;
    public isVideoInitiated: boolean = false;
    public isVideoDenied: boolean    = false;
    public isVideoRequested: boolean = false;

    public isAudioInitiated: boolean = false;

    public isPhoneDisabled: boolean = false;

    public intervalCalling: any;
    public intervalVideoing: any;
    public intervalDuration: any;

    public duration: any;
    public durationTime: Date = new Date(0, 0, 0, 0, 0, 0, 0);
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
            this.app.user.peer.stop(this.app.communicationUser.jwt);
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
        this.isVideoRequested = true;
    }

    public onAcceptVideo = () => {
        this.app.videoState = 'initiatedVideo';
        this.cleanVideoIcon();    
        this.enableVideo();

        this.app._talk.dialogToggle();
        this.app._talk.onMaximizeVideo();
        this.app._talk.onExpandNarrowVideo();
        this.app.selectDeselectUser(this.app.communicationUser);
    }

    private onDenyVideo = () => {
        this.app.user.peer.send(DataSignals.DenyingVideo, this.app.communicationUser.jwt);
        this.denyVideoIcon();
    }

    private disableStream = () => {
        this.app.user.peer.unpublish(this.app.localStream, this.app.communicationUser.jwt);

        if (this.app.localStream)
            this.app.localStream.close();

        this.app.localStream = undefined;
    }

    public enableAudio = () => {
        this.disableStream();
        Woogeen.LocalStream.create({
            audio: true
        }, this.app.onCreateStream);

        this.isAudioInitiated = true;
    }

    private disableAudio = () => {
        this.isAudioInitiated = false;
    } 

    public toggleAudio = () => {
        this.disableStream();

        if (this.isAudioInitiated &&
            this.isVideoInitiated)
            this.enableVideo(false);

        if (this.isAudioInitiated &&
            !this.isVideoInitiated)
            this.disableAudio();

        else if (!this.isAudioInitiated &&
            this.isVideoInitiated)
            this.enableVideo(true);

        else if (!this.isAudioInitiated &&
            !this.isVideoInitiated)
            this.enableAudio();
    }

    public enableVideo = (audio: boolean = true) => {
        this.disableStream();
        Woogeen.LocalStream.create({
            video: {
                device: "camera",
                resolution: "hd720p",
                frameRate: [30, 30]
            },
            audio: audio
        }, this.app.onCreateStream);

        this.isVideoInitiated = true;
    }

    private disableVideo = () => {
        this.isVideoInitiated = false;
    }

    public toggleVideo = () => {
        this.disableStream();

        if (this.isVideoInitiated &&
            this.isAudioInitiated)
            this.enableAudio();

        else if (this.isVideoInitiated &&
            !this.isAudioInitiated)
            console.log("testtttt")
            

        else if (!this.isVideoInitiated &&
            this.isAudioInitiated)
            this.enableVideo();

        else if (!this.isVideoInitiated &&
            !this.isAudioInitiated)
            this.enableVideo(false);

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
