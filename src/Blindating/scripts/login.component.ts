import {Component, OnInit} from 'angular2/core'
import {Router}       from 'angular2/router'
import {UserService}  from './user.service'
import {User}         from './user'
import {TAB_DIRECTIVES, Alert} from 'ng2-bootstrap/ng2-bootstrap'

@Component({
    selector: 'login',
    templateUrl: 'app/login.component.html',
    styleUrls: ['app/login.component.css'],
    directives: [TAB_DIRECTIVES, Alert]
})

export class LoginComponent implements OnInit {

    public tabs: Array<any> = [
        { title: 'Login', active: true },
        { title: 'Register' }
    ];
    public alert: any = { show: null, type: 'success', reason: null };

    public user: User = null;
    public jwt: string = null;
    public error: string = null;

    constructor(
        private _router: Router,
        private _userService: UserService) {
            this.jwt = this.getCookie("jwt");
        }

    ngOnInit() {
        if (this.isAuthorizedViaJWT()) {
            this._router.navigate(['Search']);
        }
    }

    login(event, email, password) {
        event.preventDefault();

        this.user = {
            ID: 0,
            firstname: null,
            lastname: null,
            email: email,
            password: password,
            JWT: null
        }

        this._userService.Login(this.user)
            .subscribe(
            jwt => {
                if (jwt == User.AUTHORIZATION_FAILED) {
                    this.alert.reason = jwt;
                    this.alert.show = true;
                    this.alert.type = "danger";
                }
                else {
                    document.cookie = "jwt=" + jwt;
                    this.user.JWT = jwt
                    this._router.navigate(['Search']);
                }
            },
            error => this.error = <any>error);
    }

    register(event, firstname, lastname, email, password) {
        event.preventDefault();
        var inputEmailReg: any = document.getElementById("email-reg");

        this.user = {
            ID: 0,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            JWT: null
        }

        this._userService.Register(this.user)
            .subscribe(
            response => {
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
            },
            error => this.error = <any>error);
    }

    private getCookie(name): string {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2)
            return parts.pop().split(";").shift();
    }

    private isAuthorizedViaJWT(): boolean {
        if (this.jwt && this._userService.isExist(this.jwt))
            return true;
        else false;
    }
}