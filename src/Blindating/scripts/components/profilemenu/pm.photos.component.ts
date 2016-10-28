import {
    Component,
    OnInit,
    EventEmitter
}                            from '@angular/core';
import { Photo }             from '../../models/photo';
import { PhotoService }      from '../../services/information/photo.service';
import { AppComponent }      from '../../components/app.component';
import {
    FileUploader,
    Headers,
    FileUploaderOptions
}                            from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://localhost:5000/api/user/photo/addbyjwt';
@Component({
    selector: 'pm-photos-component',
    templateUrl: 'app/components/profilemenu/pm.photos.component.html',
    styleUrls:   ['app/components/profilemenu/pm.photos.component.css'],
    inputs:      ['app', 'photos'],
    outputs:     ['onBack']

})
export class PmPhotosComponent implements OnInit {
    public app: AppComponent;
    public onBack: EventEmitter<{}> = new EventEmitter();

    public index:     number;
    public checkmark: string = 'url("../../../images/app/controls/checkmark-white.svg")';
    public plus:      string = 'url("../../../images/app/controls/plus-white.svg")';
    public uploader:  FileUploader = new FileUploader({ url: URL });
    public previews:  Array<any>;
    public photos:    Array<Photo>;

    constructor(
        private _photoService: PhotoService) {
        this.uploader.options.removeAfterUpload = true;
    }

    ngOnInit() {
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this._photoService.GetLast(this.app.user.id)
                .subscribe(p => {
                    var photo = p as Photo;
                    this.previews.splice(this.index, 1);
                    this.photos.unshift(photo);
                });
        }
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
        this._photoService.Remove(photo)
            .subscribe(isremoved => {
                this.photos.splice(this.photos.indexOf(photo), 1);
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