import {Component, EventEmitter, OnInit, Host, Inject, forwardRef} from 'angular2/core'
import {User}              from './user'
import {UserService}       from './user.service'
import {AppComponent}      from './app.component'
import {Router}            from 'angular2/router'
import {TAB_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap'

@Component({
    selector: 'profilemenu',
    templateUrl: 'app/profilemenu.component.html',
    styleUrls: ['app/profilemenu.component.css'],
    directives: [TAB_DIRECTIVES]
    //inputs: ['myname'],
    //outputs: ['myevent']
})

export class ProfileMenuComponent {
    public app: AppComponent;
    public tabs: Array<any> = [
        { title: 'Basic', active: true },
        { title: 'Interests', active: false },
        { title: 'Eductaion', active: false },
        { title: 'Views', active: false }
    ];
    //public myname: String;
    //public myevent: EventEmitter<any> = new EventEmitter();

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _router: Router,
        private _userService: UserService) {

        this.app = app;
    }

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

    //fire() {
    //    this.myevent.next(['abc', 'def']);
    //}
}