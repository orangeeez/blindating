import {Component, ViewChild, OnInit, Host, Inject, forwardRef, EventEmitter} from 'angular2/core'
import {AppComponent}        from './app.component'
import {UserService}         from './user.service'
import {SocialService}       from './services/social.service'
import {UserInfoService}     from './services/userinfo.service'
import {User}                from './user'
import {Photo}              from './utils/user.utils'

declare var PhotoSwipe, PhotoSwipeUI_Default;

@Component({
    selector: 'profilemenu-photos',
    templateUrl: 'app/profilemenu.photos.component.html',
    styleUrls: ['app/profilemenu.photos.component.css', 'app/profilemenu.component.css'],
    inputs: ['photos'],
    outputs: ['onBack']
})

export class ProfileMenuPhotosComponent implements OnInit {
    public onBack = new EventEmitter();

    public headerUndoIconPath = "/images/app/controls/undo.png";
    public photos: Array<Photo>;
    constructor() {}

    ngOnInit() { }

    public back() {
        this.onBack.emit([]);
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