import {
    Component,
    OnInit,
    trigger,
    state,
    style,
    transition,
    animate
}                            from '@angular/core';
import { AppComponent }      from '../../components/app.component';
import {
    SearchUserData,
    PreferenceData
}                            from '../../static/utils';
import { PreferenceService } from '../../services/information/preference.service';
import { UserService}        from '../../services/user.service';
import { SearchService }     from '../../services/search/search.service';
import { Preference }        from '../../models/preference';
import { User }              from '../../models/user';
@Component({
    selector:    'd-search-component',
    templateUrl: 'app/components/dashboard/d.search.component.html',
    styleUrls:  ['app/components/dashboard/d.search.component.css'],
    inputs:     ['app']
})
export class DSearchComponent implements OnInit {
    public app:         AppComponent;
    public searchUserData: SearchUserData;
    public preferences: Preference = new Preference();

    public searchToggles: Array<any> = [
        { title: 'Gender', name: 'gender', items: PreferenceData.genders },
        { title: 'Hair',   name: 'hcolor', items: PreferenceData.hcolors },
        { title: 'Eyes',   name: 'ecolor', items: PreferenceData.ecolors },
        { title: 'Hobby',  name: 'hobby',  items: PreferenceData.hobbies }
    ];

    constructor(
        private _userService:       UserService,
        private _searchService:     SearchService,
        private _preferenceService: PreferenceService) {
        this.searchUserData = new SearchUserData();
    }

    ngOnInit() {
        this._preferenceService.GetAllByID(this.app.user.id)
            .subscribe(preference => {
                this.preferences = preference;
            });
    }

    public onSelectPreference = (event: MouseEvent): void => {
        event.preventDefault();
        let element = event.target;
        this.preferences[element['id']] = element['innerHTML'];
    }

    public onSearchUsers(event: KeyboardEvent): void {
        if (!this.searchUserData.count)
            this.searchUserData.count = this.app._dashboard.maxUsers;

        if (this.searchUserData.name)
            this.app._dashboard.isSearchShow = true;
        else
            this.app._dashboard.isSearchShow = false;

        let key = event.which || event.keyCode;
        if (key >= 65 && key <= 90 || key == 8) {
            this.app._dashboard.searchUsers = this.app.users.filter(this.isContainName);
            this.searchUserData.count - this.app._dashboard.searchUsers.length;
            this.searchUserData.users = this.app.users;
            this._searchService.SearchUsers(this.searchUserData)
                .subscribe(users => {
                    this.app._dashboard.searchUsers.push(...users);
                });
            this.searchUserData.count + this.app._dashboard.searchUsers.length;
        }
    }

    private isContainName = (user: User) => {
        let fullName = (user.firstname + ' ' + user.lastname).toUpperCase();
        let fullNameConversely = (user.lastname + ' ' + user.firstname).toUpperCase();

        return fullName.includes(this.searchUserData.name.toUpperCase()) ||
               fullNameConversely.includes(this.searchUserData.name.toUpperCase()); 
    }
}