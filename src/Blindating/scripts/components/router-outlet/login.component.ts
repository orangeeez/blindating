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
    public JWT:       string;

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
    }

    public Login(): void {
        var auth: any;

        if (this.JWT) auth = this.JWT;
        else          auth = JSON.stringify({ email: this.email, password: this.password });

        this._userService.Login(auth)
            .subscribe(user => this.HandleLoginResponse(user));    
    }

    public Register(): void {
        this._userService.Register(this.CreateUser())
            .subscribe(response => this.HandleRegisterResponse(response));
    }
    public AuthSocial(): void { }

    private CreateUser(): User {
        var user: User = new User();
        user.email     = this.email;
        user.firstname = this.firstname;
        user.lastname  = this.lastname;
        user.password  = this.password;
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
}
