import {
    Component,
    OnInit
}                       from '@angular/core';
import {
    HANGUP,
    HANGUP_INACTIVE,
    PHONE,
    PHONE_INACTIVE
}                       from '../static/config';
import { AppComponent } from '../components/app.component';
import { UserService }  from '../services/user.service';
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

    public isCalling:       boolean = true;
    public isCallInitiated: boolean = false;
    public isCallDenied:    boolean = false;

    public isPhoneDisabled: boolean = false;

    public intervalCalling:   any;
    public intervalDuration:  any;

    public duration:          any;
    public durationTime:      Date = new Date(0, 0, 0, 0, 0, 0, 0);
    public startDurationTime: Date;

    constructor(private _userService: UserService) { }

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
        }

        if (this.app.communicationState == 'initiatedCalling')
            this.app.user.peer.stop(this.app.callerUser.jwt);

        if (this.app.communicationState == 'initiatedCaller')
            this.app.user.peer.stop(this.app.callingUser.jwt);
    }

    public onCallingBlink = (): void => {
        if (this.isCalling)
            this.isCalling = false;
        else
            this.isCalling = true;
    }
}
