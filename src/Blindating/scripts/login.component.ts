import {Component, OnInit, Host, Inject, forwardRef, ViewChild} from 'angular2/core'
import {Router, ROUTER_DIRECTIVES} from 'angular2/router'
import {AppComponent} from './app.component'
import {UserService}  from './user.service'
import {SocialService} from './services/social.service'
import {User}         from './user'
import {TAB_DIRECTIVES, Alert} from 'ng2-bootstrap/ng2-bootstrap'

declare var Woogeen: any;

@Component({
    selector: 'login',
    templateUrl: 'app/login.component.html',
    styleUrls: ['app/login.component.css'],
    directives: [TAB_DIRECTIVES, ROUTER_DIRECTIVES, Alert]
})

export class LoginComponent implements OnInit {
    public windowVKAuth: Window;
    public setCodeInterval: any;

    public app: AppComponent;
    public alert: any = { show: null, type: 'success', reason: null };
    public tabs: Array<any> = [
        { title: 'Login', active: true },
        { title: 'Register' }
    ];
    public user: User = null;
    public jwt: string = null;
    public error: string = null;
    public isEnableRegisterButton: boolean = false;

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _router: Router,
        private _userService: UserService,
        private _socialService: SocialService) {
            this.app = app;
            this.jwt = this.getCookie("jwt");
        }

    ngOnInit() {
        //#region FB SDK INIT
        window.fbAsyncInit = function () {
            FB.init({
                appId: '1557510837900819',
                cookie: true,
                xfbml: true,
                version: 'v2.5'
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/all.js";
            fjs.parentNode.insertBefore(js, fjs);
        } (document, 'script', 'facebook-jssdk'));
        //#endregion

        //#region VK SDK INIT
        //VK.init({
        //    apiId: 5549517
        //});
        //#endregion

        if (this.isAuthorizedViaJWT()) {
            this._userService.GetUser('JWT', this.jwt)
                .subscribe(finded => {
                    this._userService.Login(finded)
                        .subscribe(logged => {
                            if (logged) {
                                this.initializeUser(logged);
                                this.initializeWebRTC();
                                this._router.navigate(['Search']);
                            }
                        });
                });
        }
    }

    public login(event, email, password) {
        event.preventDefault();

        this.user = this.createUser(undefined, undefined, undefined, email, password);

        this._userService.Login(this.user)
            .subscribe(logged => {
                this.loginViaForm(logged);
            });
    }

    public register(event, firstname, lastname, email, password) {
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
        if (this.jwt)
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
            ProfileImage: profileimage,
            Online: false
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
    }

    private registerViaForm(response: string)
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
            this._router.navigate(['Search']);
        }
    }

    public signupViaSocial(event: MouseEvent) {
        if (event.srcElement.className == 'fa fa-facebook')
            this.getFacebookInfoAPI();
        else
            this.getVKInfoAPI();
    }

    private checkFBLoginInterval = () => {
        if (this.app.user != undefined) {
            this._router.navigate(['Search']);
        }
    }

    private getFacebookInfoAPI = () => {
        var self = this;

        setInterval(this.checkFBLoginInterval, 1000)

        FB.getLoginStatus(function (response) { statusChangeCallback(response); });

        function statusChangeCallback(response) {
            if (response.status === 'connected')
                FB.api('/me', { fields: 'email, first_name, last_name' }, self.setFacebookInfoAPI);
            else if (response.status === 'not_authorized')
                console.log('not_authorized');
            else
                FB.login(function (response) { statusChangeCallback(response); });
        }
    }

    private getVKInfoAPI() {
        this.setVKInfoAPI();
    }

    private setFacebookInfoAPI = (response: Object) => {
        this._userService.IsExistEmail(response['email'])
            .subscribe(isexist => {
                if (isexist) {
                    this.user = this.createUser(undefined, undefined, undefined, response['email'], undefined, undefined, undefined, undefined, 'social');
                    this._userService.Login(this.user)
                        .subscribe(logged => {
                            if (logged)
                                this.loginViaForm(logged);
                        });
                }
                else {
                    this.tabs[0].active = false;
                    this.tabs[1].active = true;

                    var firstnameField = <HTMLInputElement>document.getElementById('firstname');
                    var lastnameField = <HTMLInputElement>document.getElementById('lastname');
                    var emailField = <HTMLInputElement>document.getElementById('email-reg');
                    var passwordField = <HTMLInputElement>document.getElementById('password-reg');

                    firstnameField.value = response['first_name'];
                    lastnameField.value = response['last_name'];
                    emailField.value = response['email'];

                    firstnameField.classList.remove('ng-invalid');
                    firstnameField.classList.add('ng-valid');
                    lastnameField.classList.remove('ng-invalid');
                    lastnameField.classList.add('ng-valid');
                    emailField.classList.remove('ng-invalid');
                    emailField.classList.add('ng-valid');

                    passwordField.focus();
                    this.isEnableRegisterButton = true;
                }
            });
    }

    private setVKInfoAPI = () => {
        this.getAccessToken();
    }

    private getAccessToken = () => {
        let url = 'https://oauth.vk.com/authorize?client_id=5549517&display=popup&redirect_uri=http://localhost:59993/utils/blank.html&response_type=code&scope=email'
        this.windowVKAuth = this.popupCenter(url, '', 660, 370);

        this.setCodeInterval = setInterval(this.setAccessTokenInterval, 1000);
    }

    private setAccessTokenInterval = () => {
        try {
            if (this.windowVKAuth.location.href.includes('code=')) {
                clearInterval(this.setCodeInterval);
                let href = this.windowVKAuth.location.href;
                let index = href.indexOf('=');
                let code = href.substring(index + 1, href.length);
                this.windowVKAuth.close();

                this._socialService.GetVKInfo(code)
                    .subscribe(info => {
                        this._userService.IsExistEmail(info['response'][0]['email'])
                            .subscribe(isexist => {
                                if (isexist) {
                                    this.user = this.createUser(undefined, undefined, undefined, info['response'][0]['email'], undefined, undefined, undefined, undefined, 'social');
                                    this._userService.Login(this.user)
                                        .subscribe(logged => {
                                            if (logged)
                                                this.loginViaForm(logged);
                                        });
                                }
                                else {
                                    var firstnameField = <HTMLInputElement>document.getElementById('firstname');
                                    var lastnameField = <HTMLInputElement>document.getElementById('lastname');
                                    var emailField = <HTMLInputElement>document.getElementById('email-reg');
                                    var passwordField = <HTMLInputElement>document.getElementById('password-reg');

                                    firstnameField.value = info['response'][0]['first_name'];
                                    lastnameField.value = info['response'][0]['last_name'];
                                    emailField.value = info['response'][0]['email'];

                                    firstnameField.classList.remove('ng-invalid');
                                    firstnameField.classList.add('ng-valid');
                                    lastnameField.classList.remove('ng-invalid');
                                    lastnameField.classList.add('ng-valid');
                                    emailField.classList.remove('ng-invalid');
                                    emailField.classList.add('ng-valid');

                                    passwordField.focus();
                                    this.isEnableRegisterButton = true;
                                }
                            });
                    });
            }
        }
        catch (error) { console.log(error) }
    }

    private popupCenter(url, title, w, h): Window {
        var dualScreenLeft = window.screenLeft;
        var dualScreenTop = window.screenTop;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        if (window.focus)
            newWindow.focus();

        return newWindow;
    }
}