import {Component, EventEmitter, OnInit, Host, Inject, forwardRef} from 'angular2/core'
import {User}              from './user'
import {Quote}              from './utils/user.utils'
import {UserService}       from './user.service'
import {AppComponent}      from './app.component'
import {Router}            from 'angular2/router'
import {TAB_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap'

@Component({
    selector: 'profilemenu',
    templateUrl: 'app/profilemenu.component.html',
    styleUrls: ['app/profilemenu.component.css'],
    directives: [TAB_DIRECTIVES]
})

export class ProfileMenuComponent implements OnInit {
    public app: AppComponent;
    public tabs: Array<any> = [
        { title: 'Basic', active: true },
        { title: 'Interests', active: false },
        { title: 'Eductaion', active: false },
        { title: 'Media', active: false }
    ];
    public quote: Quote;

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _router: Router,
        private _userService: UserService) {

        this.app = app;
    }

    ngOnInit() {}

    public logout() {
        this._userService.DeleteOnlineUser(this.app.user.ID.toString())
            .subscribe(deleted => {
                if (deleted) {
                    this.app.headerIsShow = false;
                    this.app.footerIsShow = false;
                    this.app.headerProfileImage = null;
                    this.app.profilemenuIsShow = false;
                    this.app.hideProfileMenu();
                    this.app.user = null;
                    this._router.navigate(['Login']);
                    document.cookie = 'jwt=; Max-Age=0'
                }
            });
        
    }
}