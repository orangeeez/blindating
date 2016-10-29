import {
    Component,
    ViewChild,
    trigger,
    state,
    style,
    transition,
    animate
}                               from '@angular/core';
import { UserService }          from '../services/user.service';
import { User }                 from '../models/user';
import { Photo }                from '../models/photo';
import { FooterComponent }      from '../components/footer.component';
import { HeaderComponent }      from '../components/header.component';
import { HelperComponent }      from '../components/helper.component';
import { LoginComponent }       from '../components/router-outlet/login.component';
import { ProfilemenuComponent } from '../components/profilemenu.component';
declare var PhotoSwipe, PhotoSwipeUI_Default;
@Component({
    selector:    'blindating',
    templateUrl: 'app/components/app.component.html',
    styleUrls:   ['app/components/app.component.css'],
    providers:   [UserService],
    animations: [
        trigger('profilemenuState', [
            state('deselected', style({
                width: '8.3%'
            })),
            state('selected', style({
                width: '30%'
            })),
            transition('deselected => selected', animate('100ms ease-in')),
            transition('selected => deselected', animate('100ms ease-out'))
        ])
    ]
})
export class AppComponent {
    @ViewChild(FooterComponent)      public _footer: FooterComponent;
    @ViewChild(HeaderComponent)      public _header: HeaderComponent;
    @ViewChild(HelperComponent)      public _helper: HelperComponent;
    @ViewChild(ProfilemenuComponent) public _profilemenu: ProfilemenuComponent;

    public user:         User;
    public users:        User[];
    public selectedUser: User = null;
    public callingUser:  User;
    public callerUser:   User;
    public communicationState: string = 'none';

    public isHeaderShow:  boolean = false;
    public isSelectedYou: boolean = false;

    constructor(private _userService: UserService) { }

    public selectDeselectUser(user: User): void {
        if (this.selectedUser == user) {
            this.selectedUser = null;
            this._profilemenu.ToggleState();
        }
        else if (this.selectedUser == null) {
            this.selectedUser = user;
            this._profilemenu.ToggleState();
        }
        else {
            this.selectedUser = user;
            this._header.isProfileActive = false;
        }

        if (!this.selectedUser)
            this.isSelectedYou = false;
        else
            this.isSelectedYou = this.user.id == this.selectedUser.id;
    }

    public openGallery(photos: Photo[], number: number = 0): void {
        var fitted = this.fitPhotos(photos);
        var pswpElement = document.querySelectorAll('.pswp')[0];
        var options = {
            index: number,
            history: false,
            focus: false,
            showAnimationDuration: 0,
            hideAnimationDuration: 0
        };
        new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, fitted, options).init();
    }

    private fitPhotos(photos: Photo[]): Photo[] {
        let items: Array<any> = [];
        for (let photo of photos) {
            items.push({
                src: photo.path,
                w: photo.width,
                h: photo.height
            })
        }
        return items;
    }
}
