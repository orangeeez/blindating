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
import { NOAVATAR }      from '../../static/config'
@Component({
    selector: 'dashboard-component',
    templateUrl: 'app/components/router-outlet/dashboard.component.html',
    styleUrls: ['app/components/router-outlet/dashboard.component.css'],
    providers: [UserService, CookieService]
})
export class DashboardComponent implements OnInit {
    public app:      AppComponent;
    public noavatar: string = NOAVATAR;

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _userService:   UserService,
        private _cookieService: CookieService,
        private _router:        Router) {

        this.app = app;
        var id = this.app.user.id;
        window.onbeforeunload = function (e) {
            _userService.Logout(id).subscribe();
        };
    }

    ngOnInit() {
        this.app._header.isDashboardActive = true;
        this._userService.GetAll()
            .subscribe(users => {
                this.app.users = users.filter(this.removeCurrentUser);
            });
    }

    private removeCurrentUser = (user: User): boolean => {
        return user.id != this.app.user.id;
    }
}