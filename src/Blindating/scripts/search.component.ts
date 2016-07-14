import {Component, OnInit, Host, Inject, forwardRef} from 'angular2/core'
import {Router, CanActivate} from 'angular2/router'
import {User}              from './user'
import {UserService}       from './user.service'
import {AppComponent}      from './app.component'

@Component({
    selector: 'search',
    templateUrl: 'app/search.component.html',
    styleUrls: ['app/search.component.css'],
})

export class SearchComponent implements OnInit {
    public app: AppComponent;
    public searchedUsers: User[] = new Array<User>();
    public isSearchNotFound: boolean = false;

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _userService: UserService,
        private _router: Router) {

        this.app = app;
        this.app.headerIsShow = true;
        this.app.headerProfileImage = this.app.user.ProfileImage;
        this.app.footerIsShow = true;
    }

    ngOnInit() {
        this._userService.GetUsers()
            .subscribe(users => {
                this.app.users = users;
            });
    }
    showProfileMenuHelper(event) {
        let centralColumn = document.getElementById('central-column');
        let rightColumn = document.getElementById('right-column');
        let centralColumnPosition = 83.3;
        let rightColumnPosition = 8.3;
        let pmAnimateInterval = setInterval(animate, 10);
        function animate() {
            if (centralColumnPosition == 63.3)
                clearInterval(pmAnimateInterval);
            else {
                centralColumnPosition--;
                rightColumnPosition++;
                centralColumn.style.width = centralColumnPosition + '%';
                rightColumn.style.width = rightColumnPosition + '%';
            }
        }
    }
}