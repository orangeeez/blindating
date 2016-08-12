import {Component, EventEmitter, OnInit, Host, Inject, forwardRef} from 'angular2/core'
import {User}              from './user'
import {Quote, Photo, Conversation} from './utils/user.utils'
import {UserService}       from './user.service'
import {AppComponent}      from './app.component'
import {Router}            from 'angular2/router'
import {IterateToPipe}     from './pipes/iterateto.pipe'
import {TAB_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap'
import {ProfileMenuPhotosComponent} from './profilemenu.photos.component'

declare var PhotoSwipe, PhotoSwipeUI_Default;

@Component({
    selector: 'profilemenu',
    templateUrl: 'app/profilemenu.component.html',
    styleUrls: ['app/profilemenu.component.css', 'app/search.component.css'],
    pipes: [IterateToPipe],
    directives: [TAB_DIRECTIVES, ProfileMenuPhotosComponent]
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
    public photos: Array<Photo>;
    public conversations: Array<Conversation>;

    public isOpenPhotos: boolean = false;

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _router: Router,
        private _userService: UserService) {

        this.app = app;
    }

    ngOnInit() { }

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

    public openPhotos() {
        this.isOpenPhotos = true;
    }

    public onBackPhotos() {
        this.isOpenPhotos = false;
    }

    //#region OpenGallery
    public openGallery(event: MouseEvent) {
        let items: Array<any> = [];
        for (let photo of this.photos) {
            if ("http://localhost:59993/" + photo.Path === event.target['src'])
                items.unshift({
                    src: 'http://localhost:59993/' + photo.Path,
                    w: photo.Width,
                    h: photo.Height
                });
            else items.push({
                src: 'http://localhost:59993/' + photo.Path,
                w: photo.Width,
                h: photo.Height
            })
        }
        var openPhotoSwipe = function (items) {
            var pswpElement = document.querySelectorAll('.pswp')[0];
            var options = {
                history: false,
                focus: false,
                showAnimationDuration: 0,
                hideAnimationDuration: 0
            };
            var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };

        openPhotoSwipe(items);
    }
    //#endregion
}