import {Component, OnInit, Host, Inject, forwardRef} from 'angular2/core'
import {User}              from './user'
import {UserService}       from './user.service'
import {AppComponent}      from './app.component'

@Component({
    selector: 'helper',
    templateUrl: 'app/helper.component.html',
    styleUrls: ['app/helper.component.css'],
    inputs: ['phoneIconPath', 'phoneHangupIconPath']
})

export class HelperComponent implements OnInit {
    public app: AppComponent;
    public phoneIconPath: String;
    public phoneHangupIconPath: String;
    public isSearchUserSelected: boolean = false;
    public blockPhoneIcon: HTMLElement;
    public blockPhoneHangupIcon: HTMLElement;

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _userService: UserService) {
        this.app = app;
    }

    ngOnInit() {
        this.blockPhoneIcon = document.getElementById('phone-icon');
        this.blockPhoneHangupIcon = document.getElementById('phone-hangup-icon');
        this.blockPhoneIcon.addEventListener('mouseover', this.onPhoneMouseOver)
        this.blockPhoneHangupIcon.addEventListener('mouseover', this.onPhoneMouseOver)
    }

    private onPhoneMouseOver = () => {
        if (!this.app.selectedUser.Online) {
            this.blockPhoneIcon.classList.remove('nav-li-decoration');
            this.blockPhoneHangupIcon.classList.remove('nav-li-decoration');
        }
        else {
            this.blockPhoneIcon.classList.add('nav-li-decoration');
            this.blockPhoneHangupIcon.classList.remove('nav-li-decoration');
        }
    }
}