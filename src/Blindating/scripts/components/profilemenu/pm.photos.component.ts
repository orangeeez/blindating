import {
    Component,
    OnInit,
    EventEmitter,
    AfterViewInit
}                              from '@angular/core';
import { Photo }               from '../../models/photo';
import { PhotoService }        from '../../services/information/photo.service';
import { AppComponent }        from '../../components/app.component';
import { ProgressPrice }       from '../../static/utils';
import {
    FileUploader,
    Headers,
    FileUploaderOptions
}                               from 'ng2-file-upload/ng2-file-upload';
import { PHOTO_BY_JWT_ADDRESS } from '../../static/config';
@Component({
    selector: 'pm-photos-component',
    templateUrl: 'app/components/profilemenu/pm.photos.component.html',
    styleUrls:   ['app/components/profilemenu/pm.photos.component.css'],
    inputs:      ['app', 'photos'],
    outputs:     ['onBack']

})
export class PmPhotosComponent implements OnInit, AfterViewInit {
    public app: AppComponent;
    public onBack: EventEmitter<{}> = new EventEmitter();

    public index:     number;
    public checkmark: string = 'url("../../../images/app/controls/checkmark-white.svg")';
    public plus:      string = 'url("../../../images/app/controls/plus-white.svg")';
    public uploader: FileUploader = new FileUploader({
        url: PHOTO_BY_JWT_ADDRESS,
        authToken: 'Bearer ' + localStorage.getItem('id_token')
    });
    public previews:  Array<any>;
    public photos:    Array<Photo>;

    constructor(
        private _photoService: PhotoService) {
        this.uploader.options.removeAfterUpload = true;
    }

    ngOnInit() {
        var userIdHeader: Headers = { name: 'UserID', value: this.app.selectedUser.id + "" };
        this.uploader.options.headers = [];
        this.uploader.options.headers.push(userIdHeader);

        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this._photoService.GetLast(this.app.user.id)
                .subscribe(p => {
                    var isFirst = this.photos.length == 0;

                    var photo = p as Photo;
                    this.previews.splice(this.index, 1);
                    this.photos.unshift(photo);

                    if (isFirst)
                        this.app.selectedUser.progress += ProgressPrice.basic;
                });
        }
    }

    ngAfterViewInit() {
        document.getElementById('profilemenu').scrollTop = 0;
    }

    public onBackPhotos(): void {
        this.onBack.emit([]);
    }

    public onUpload(item: any, index: number): void {
        this.index = index;
        this.uploader.uploadItem(item);
    }

    public onUploadAll(event: Event): void {
        event.preventDefault();
        this.uploader.uploadAll();
    }

    public onChangeUpload(upload: HTMLInputElement): void {
        this.previews = new Array<any>();
        if (upload.files && upload.files[0]) {
            for (var i = 0; i < upload.files.length; i++) {
                var reader = new FileReader();
                reader.onload = this.previewUpload;
                reader.readAsDataURL(upload.files[i]);
            }
        }
    }

    public onRemovePhoto(photo: Photo): void {
        photo.isLast = this.photos.length == 1;
        this._photoService.Remove(photo)
            .subscribe(isremoved => {
                this.photos.splice(this.photos.indexOf(photo), 1);

                if (photo.isLast)
                    this.app.selectedUser.progress -= ProgressPrice.basic;
            });
    } 

    public onRemoveUpload(item: any, index: number): void {
        this.uploader.removeFromQueue(item);
        this.previews.splice(index, 1);
    }

    private previewUpload = (event: Event): any => {
        this.previews.push(event.target['result']);
    }
}