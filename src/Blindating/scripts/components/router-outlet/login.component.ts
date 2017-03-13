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
import { SocialService }   from '../../services/social.service';

import { User }          from '../../models/user';
import { AppComponent }  from '../../components/app.component';

declare var VK: any;
@Component({
    selector:    'login-component',
    templateUrl: 'app/components/router-outlet/login.component.html',
    styleUrls:   ['app/components/router-outlet/login.component.css'],
})
export class LoginComponent implements OnInit {
    public windowVKAuth: Window;
    public setCodeInterval: any;

    public app:       AppComponent;
    public email:     string;
    public password:  string;
    public facebook:  string;
    public vk      :  string;
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
        private _socialService: SocialService,
        private _router:        Router) {
        this.app = app;
    }

    public ngOnInit() {
        this.JWT = localStorage.getItem('id_token');

        if (this.JWT) this.Login();
        else {
            VK.init({
                apiId: 5549517
            });
            setTimeout(function() {
                var el = document.createElement("script");
                el.type = "text/javascript";
                el.src = "//vk.com/js/api/openapi.js";
                el.async = true;
                document.getElementById("vk_api_transport").appendChild(el);
            }, 0);
            
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

        if (this.JWT)           auth = JSON.stringify({ jwt:   this.JWT });
        else if (this.password) auth = JSON.stringify({ email: this.email, password: this.password });
        else if (this.facebook) auth = JSON.stringify({ email: this.email, facebook: this.facebook });
        else if (this.vk)       auth = JSON.stringify({ email: this.email, vk:       this.vk });           

        this._userService.Login(auth)
            .subscribe(user => {
                this.HandleLoginResponse(user);
            });    
    }

    public Register(): void {
        this._userService.Register(this.CreateUser())
            .subscribe(response => this.HandleRegisterResponse(response));
    }
    public onAuthSocial(): void {
        if (event.srcElement.className == 'fa fa-facebook')
            this.GetFacebookInfoAPI();
        else
           this.GetVKInfoAPI();
    }

    private GetVKInfoAPI = () => {
        var self = this;

        VK.Auth.login(function(response) {
            if (response.session) {
                self.SetVKInfoAPI(response.session);
                /* User is authorized successfully */
                if (response.settings) {
                /* Selected user access settings, if they were requested */
                }
            } else {
                console.log('VK canceled');
                /* User clicked Cancel button in the authorization window */
            }
        });
    }

    private GetFacebookInfoAPI = () => {
        var self = this;

        setInterval(this.CheckFBLoginInterval, 1000)

        FB.getLoginStatus(function (response) { statusChangeCallback(response); });

        function statusChangeCallback(response) {
            if (response.status === 'connected')
                FB.api('/me', { fields: 'email, first_name, last_name' }, self.SetFacebookInfoAPI);
            else
                FB.login(function (response) { statusChangeCallback(response); });
        }
    }

    private CheckFBLoginInterval = () => {
        if (this.app.user) 
            this._router.navigate(['/dashboard']);
    }

    private SetVKInfoAPI = (session: any) => {
        let url = 'https://oauth.vk.com/authorize?client_id=5549517&display=popup&redirect_uri=https://localhost:8000/blank.html&response_type=code&scope=email'
        this.windowVKAuth = this.PopupCenter(url, '', 660, 370);
 
        this.setCodeInterval = setInterval(this.setAccessTokenInterval, 1000, session);
    }

    private SetFacebookInfoAPI = (response: Object) => {
        this.email    = response['email'];
        this.facebook = this._cookieService.get('fbsr_1557510837900819');
        this._userService.IsEmailExist(response['email'])
            .subscribe(isexist => {
               if (isexist)
                    this.Login(response);
                else {
                    this.firstname = response["first_name"];
                    this.lastname  = response["last_name"];                    
                    this.tabs[0].active = false; 
                    this.tabs[1].active = true;
                }
            });
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
            this.alert.reason = user.reason;
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

    private setAccessTokenInterval = (session: any) => {
         try {
             if (this.windowVKAuth.location.href.includes('code=')) {
                 clearInterval(this.setCodeInterval);
                 let href  = this.windowVKAuth.location.href;
                 let index = href.indexOf('=');
                 let code  = href.substring(index + 1, href.length);
                 this.windowVKAuth.close();
 
                 this._socialService.GetVKInfo(code)
                     .subscribe(email => {
                         this.email = email;
                         this.vk    = "vk";
                         this._userService.IsEmailExist(email)
                            .subscribe(isexist => {
                                if (isexist) {
                                    this.Login(session);
                                }
                                else {
                                    this.firstname = session.user.first_name;
                                    this.lastname  = session.user.last_name;                    
                                    this.tabs[0].active = false; 
                                    this.tabs[1].active = true;
                                }
                            });
                     });
             }
         }
         catch (error) { }
     }
 
     private PopupCenter(url, title, w, h): Window {
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
