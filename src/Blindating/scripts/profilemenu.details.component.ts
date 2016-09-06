import {Component, ViewChild, OnInit, OnDestroy, Host, Inject, forwardRef, EventEmitter, ElementRef} from 'angular2/core'
import {AppComponent}        from './app.component'
import {UserDetailsService}     from './services/userdetails.service'
import {User}                from './user'
import {Detail}              from './utils/user.utils'
import {IterateOverObjectPipe} from './pipes/iterateOverObject'
import {BASIC_INFORMATION, BASIC_INFORMATION_ICONS, LOOKS, LOOKS_ICONS} from './mock/details'

@Component({
    selector: 'profilemenu-details',
    templateUrl: 'app/profilemenu.details.component.html',
    styleUrls: ['app/profilemenu.details.component.css', 'app/profilemenu.component.css', 'app/search.component.css', 'css/styles.css'],
    pipes: [IterateOverObjectPipe],
    inputs: ['app']
})

export class ProfileMenuDetailsComponent implements OnInit, OnDestroy {
    public app: AppComponent;

    public basicInformation = BASIC_INFORMATION;
    public basicInformationIcons = BASIC_INFORMATION_ICONS;

    public looks = LOOKS;
    public looksIcons = LOOKS_ICONS;

    public content: Detail;

    constructor(private _userDetailsService: UserDetailsService) { }

    ngOnInit() {
        this._userDetailsService.GetDetails(this.app.user.ID)
            .subscribe(details => {
                this.content = details;
            });
    }

    ngOnDestroy() { }

    edit() {
        console.log('edit');
    }
}