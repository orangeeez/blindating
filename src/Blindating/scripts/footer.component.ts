import {Component, EventEmitter, OnInit, Host, Inject, forwardRef} from 'angular2/core'
import {User}              from './user'
import {UserService}       from './user.service'
import {AppComponent}      from './app.component'

@Component({
    selector: 'foot',
    templateUrl: 'app/footer.component.html',
    styleUrls: ['app/footer.component.css'],
    inputs: ['updateIconPath', 'searchIconPath'],
    outputs: ['updateUsers']
})

export class FooterComponent implements OnInit {
    public app: AppComponent;
    public searchString: string = '';
    public searchInput: HTMLElement
    public updateText: HTMLElement;
    public updateUsersInterval: number = 15;
    public updateIconPath: String;
    public searchIconPath: String;
    public updateUsers: EventEmitter<any> = new EventEmitter();

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _userService: UserService) {
        this.app = app;
    }
    ngOnInit() {
        let searchIcon = document.getElementById('search-icon');
        let updateIcon = document.getElementById('update-icon');
        this.searchInput = document.getElementById('search-input');
        this.updateText = document.getElementById('update-text');
        searchIcon.addEventListener('mouseover', this.showSearchInput);
        updateIcon.addEventListener('mouseover', this.showUpdateText);
        updateIcon.addEventListener('mouseout', this.hideUpdateText);
        
        this.initializeUpdateTimer();
    }

    fireUpdateOnlineUsers() {
        this.updateUsersInterval = 15;
        this.updateUsers.next([]);
    }

    showSearchInput = () => {
        this.searchInput.hidden = false;
    }

    showUpdateText = () => {
        this.updateText.hidden = false;
        this.searchInput.hidden = true;
    }

    hideUpdateText = () => {
        this.updateText.hidden = true;
    }

    filterUsers = (event: KeyboardEvent) => {
        let key = event.which || event.keyCode;
        let char = String.fromCharCode(key);
        switch (key) {
            case 8:
                this.searchString = this.searchString.slice(0, -1)
                this.app._searchComponent.searchedUsers = this.app.users.filter(this.isUsersContainsSearchString);
                this.checkSearchUsersLength();
                break;
            case 16:
                break;
            default:
                this.searchString += char;
                this.app._searchComponent.searchedUsers = this.app.users.filter(this.isUsersContainsSearchString);
                this.checkSearchUsersLength();
                break;
        }
    }

    private isUsersContainsSearchString = (user: User) => {
        let fullName = (user.Firstname + ' ' + user.Lastname).toUpperCase();
        if (fullName.includes(this.searchString)) {
            return true;
        }
        else return false;
    }

    initializeUpdateTimer = () => {
        setInterval(this.updateTimer, 1000);
    }

    updateTimer = () => {
        if (this.updateUsersInterval == 0)
            this.updateUsersInterval = 15;
        else {
            this.updateUsersInterval--;
        }
    }

    checkSearchUsersLength = () => {
        if (this.app._searchComponent.searchedUsers.length == 0)
            this.app._searchComponent.isSearchNotFound = true;
        else
            this.app._searchComponent.isSearchNotFound = false;
    }
}