import {Component, OnInit, Host, Inject, forwardRef} from 'angular2/core'
import {Router}       from 'angular2/router'
import {AppComponent} from './app.component'
import {UserService}  from './user.service'
import {User}         from './user'
import {TAB_DIRECTIVES, Alert} from 'ng2-bootstrap/ng2-bootstrap'

declare var Woogeen: any

@Component({
    selector: 'login',
    templateUrl: 'app/login.component.html',
    styleUrls: ['app/login.component.css'],
    directives: [TAB_DIRECTIVES, Alert]
})

export class LoginComponent implements OnInit {

    public app: AppComponent;
    public tabs: Array<any> = [
        { title: 'Login', active: true },
        { title: 'Register' }
    ];
    public alert: any = { show: null, type: 'success', reason: null };

    public user: User = null;
    public jwt: string = null;
    public error: string = null;

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _router: Router,
        private _userService: UserService) {
            this.app = app;
            this.jwt = this.getCookie("jwt");
        }

    ngOnInit() {
        if (this.isAuthorizedViaJWT()) {
            this._userService.GetUser('JWT', this.jwt)
                .subscribe(finded => {
                    this._userService.Login(finded)
                        .subscribe(logged => {
                            this.initializeUser(logged);
                            this.initializeWebRTC();
                        });
                });
        }
    }

    login(event, email, password) {
        event.preventDefault();

        this.user = this.createUser(undefined, undefined, undefined, email, password);

        this._userService.Login(this.user)
            .subscribe(logged => {
                this.loginViaForm(logged);
            });
    }

    register(event, firstname, lastname, email, password) {
        event.preventDefault();

        this.user = this.createUser(undefined, firstname, lastname, email, password);

        this._userService.Register(this.user)
            .subscribe(response => {
                this.registerViaForm(response);
            });
    }

    private getCookie(name): string {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2)
            return parts.pop().split(";").shift();
    }

    private isAuthorizedViaJWT(): boolean {
        if (this.jwt && this._userService.IsExist(this.jwt))
            return true;
        else false;
    }

    private createUser(id?: number, firstname?: string, lastname?: string, email?: string, password?: string,
        jwt?: string, nickname?: string, peer?: string, reason?: string, profileimage?: string): User {

        return {
            ID: id,
            Firstname: firstname,
            Lastname: lastname,
            Email: email,
            Password: password,
            JWT: jwt,
            Nickname: nickname,
            Peer: peer,
            Reason: reason,
            ProfileImage: profileimage
        }
    }

    private initializeUser(user: User) {
        this.user = user;
        this.app.user = this.user;
        this._userService.SaveUserState(this.app.user);
    }

    private initializeWebRTC() {
        this.user.Peer = new Woogeen.PeerClient({
            iceServers: [{
                urls: this.app.stun
            }]
        });
        this.user.Peer.connect({
            host: this.app.server, token: this.app.user.Firstname + this.app.user.Lastname
        });
        this.app.user = this.user;
        this._userService.SaveUserState(this.app.user);
        this._router.navigate(['Search']);
    }

    registerViaForm(response: string)
    {
        var inputEmailReg: any = document.getElementById("email-reg");

        this.alert.reason = response;
        if (response == User.REGISTERED_SUCCESSFULLY) {
            this.alert.show = true;
            this.tabs[1].active = false;
            this.tabs[0].active = true;
            this.tabs[1].disabled = true;
        }
        else if (response == User.EMAIL_ALREADY_EXIST) {
            this.alert.show = false;
            inputEmailReg.className = inputEmailReg.className.replace(/(?:^|\s)ng-valid(?!\S)/g, '');
            inputEmailReg.className += " ng-invalid";
        }
    }

    private loginViaForm(logged: User) {
        if (logged.Reason == User.AUTHORIZATION_FAILED) {
            this.alert.reason = logged.Reason;
            this.alert.show = true;
            this.alert.type = "danger";
        }
        else {
            document.cookie = "jwt=" + logged.JWT;
            this.initializeUser(logged);
            this.initializeWebRTC();
        }
    }
}