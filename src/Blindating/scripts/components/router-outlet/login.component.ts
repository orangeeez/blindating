import {
    Component,
    Host,
    Inject,
    OnInit,
    forwardRef
}                        from '@angular/core';
import { Router }        from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { UserService }   from '../../services/user.service';
import { User }          from '../../models/user';
import { AppComponent }  from '../../components/app.component';
@Component({
    selector:    'login-component',
    templateUrl: 'app/components/router-outlet/login.component.html',
    styleUrls:   ['app/components/router-outlet/login.component.css'],
})
export class LoginComponent implements OnInit {
    public app:       AppComponent;
    public email:     string;
    public password:  string;
    public firstname: string;
    public lastname:  string;
    public phrase:    string;
    public JWT:       string;

    public isPhraseFocused: boolean = false;

    public alert: any = { show: false, type: 'success', reason: null };

    public tabs: Array<any> = [
        { title: 'Login', active: true },
        { title: 'Register' }
    ];

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _userService:   UserService,
        private _cookieService: CookieService,
        private _router:        Router) {
        this.app = app;
    }

    public ngOnInit() {
        this.JWT = localStorage.getItem('id_token');

        if (this.JWT) this.Login();
        else {
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
        }
    }

    public Login(response?: Object): void {
        var auth: any;

        if (this.JWT) auth = this.JWT;
        else          auth = JSON.stringify({ email: this.email, password: this.password });

        this._userService.Login(auth)
            .subscribe(user => {
                if (user.jwt)
                    this.HandleLoginResponse(user);
                else if (user.reason == User.REGISTER_SOCIAL) {
                    this.alert.reason   = user.reason;
                    this.alert.show     = true;
                    this.tabs[0].active = false;
                    this.tabs[1].active = true;
                    this.firstname = response['first_name'];
                    this.lastname  = response['last_name'];
                    this.email     = response['email'];
                    this.password  = "";
                }
            });    
    }

    public Register(): void {
        this._userService.Register(this.CreateUser())
            .subscribe(response => this.HandleRegisterResponse(response));
    }
    public onAuthSocial(): void {
        if (event.srcElement.className == 'fa fa-facebook')
            this.getFacebookInfoAPI();
        //else
        //    this.getVKInfoAPI();
    }

    private getFacebookInfoAPI = () => {
        var self = this;

        setInterval(this.checkFBLoginInterval, 1000)

        FB.getLoginStatus(function (response) { statusChangeCallback(response); });

        function statusChangeCallback(response) {
            if (response.status === 'connected')
                FB.api('/me', { fields: 'email, first_name, last_name' }, self.setFacebookInfoAPI);
            else
                FB.login(function (response) { statusChangeCallback(response); });
        }
    }

    private checkFBLoginInterval = () => {
        if (this.app.user) 
            this._router.navigate(['/dashboard']);
    }

    private setFacebookInfoAPI = (response: Object) => {
        this.email = response['email'];
        this.password = this._cookieService.get('fbsr_1557510837900819'); //'social';
        this.Login(response);
        //console.log(response['email']);
        //this._userService.IsExistEmail(response['email'])
            //.subscribe(isexist => {
            //    if (isexist) {
            //        this.user = this.createUser(undefined, undefined, undefined, response['email'], undefined, undefined, undefined, undefined, 'social');
            //        this._userService.Login(this.user)
            //            .subscribe(logged => {
            //                if (logged)
            //                    this.loginViaForm(logged);
            //            });
            //    }
            //});
    }


    private CreateUser(): User {
        var user: User  = new User();
        user.email      = this.email;
        user.firstname  = this.firstname;
        user.lastname   = this.lastname;
        user.password   = this.password;
        user.phrase     = this.phrase;
        user.registered = new Date().toLocaleString();
        return user;
    }

    private HandleRegisterResponse = (response: string): void => {
        this.alert.show = true;
        this.alert.reason = response['Text'];

        if (response['Text'] == User.REGISTERED_SUCCESSFULLY) {
            localStorage.setItem('id_token', response['JWT']);
            this.JWT = response['JWT'];
            this.Login();
        }
        else this.alert.type = 'danger';
    }

    private HandleLoginResponse = (user: User): void => {   
        if (user.reason == User.AUTHORIZATION_FAILED) {
            this.alert.type = 'danger';
            this.alert.show = true;
            this.alert.reason = User.AUTHORIZATION_FAILED;
        }
        else {
            this.app.user = user;
            this.app.initializeWebRTC();
            this.app.isHelperShow = true;
            this.app.isHeaderShow = true;
            this._router.navigate(['/dashboard']);
            localStorage.setItem('id_token', user.jwt);
        }
    }

    public onFocusinPhrase(): void {
        this.isPhraseFocused = true;
    } 

    public onFocusoutPhrase(): void {
        this.isPhraseFocused = false;
    }
}
