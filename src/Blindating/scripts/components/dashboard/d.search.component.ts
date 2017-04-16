import {
    Component,
    OnInit,
    trigger,
    state,
    style,
    transition,
    animate
}                         from '@angular/core';
import { AppComponent }   from '../../components/app.component';
import { SearchUserData } from '../../static/utils';
import { UserService }    from '../../services/user.service';
import { SearchService }  from '../../services/search/search.service';

import { User }         from '../../models/user';
@Component({
    selector:    'd-search-component',
    templateUrl: 'app/components/dashboard/d.search.component.html',
    styleUrls:  ['app/components/dashboard/d.search.component.css'],
    inputs:     ['app']
})
export class DSearchComponent implements OnInit {
    public app:        AppComponent;
    public searchData: SearchUserData;

    public searchToggles: Array<any> = [
        { title: 'Gender', items: ['Male', 'Female', 'Anyway'] },
        { title: 'Hair',   items: ['Male', 'Female', 'Anyway'] },
        { title: 'Eyes',   items: ['Male', 'Female', 'Anyway'] },
        { title: 'Color',  items: ['Male', 'Female', 'Anyway'] },
    ];

    constructor(private _userService:   UserService,
                private _searchService: SearchService) {
        this.searchData = new SearchUserData();
    }

    ngOnInit() { }

    public onSearchUsers(event: KeyboardEvent): void {
        if (!this.searchData.count)
            this.searchData.count = this.app._dashboard.maxUsers;

        if (this.searchData.name)
            this.app._dashboard.isSearchShow = true;
        else
            this.app._dashboard.isSearchShow = false;

        let key = event.which || event.keyCode;
        if (key >= 65 && key <= 90 || key == 8) {
            this.app._dashboard.searchUsers = this.app.users.filter(this.isContainName);
            this.searchData.count - this.app._dashboard.searchUsers.length;
            this.searchData.users = this.app.users;
            this._searchService.SearchUsers(this.searchData)
                .subscribe(users => {
                    this.app._dashboard.searchUsers.push(...users);
                });
            this.searchData.count + this.app._dashboard.searchUsers.length;
        }
    }

    private isContainName = (user: User) => {
        let fullName = (user.firstname + ' ' + user.lastname).toUpperCase();
        let fullNameConversely = (user.lastname + ' ' + user.firstname).toUpperCase();

        return fullName.includes(this.searchData.name.toUpperCase()) ||
               fullNameConversely.includes(this.searchData.name.toUpperCase()); 
    }
}