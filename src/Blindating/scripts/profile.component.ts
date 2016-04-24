import {Component, OnInit} from 'angular2/core';

declare var Croppie: any;

@Component({
    selector: 'profile',
    templateUrl: 'app/profile.component.html',
    styleUrls: ['app/profile.component.css'],
})
export class ProfileComponent implements OnInit {
    ngOnInit() {
        this.loadAvatarComponent();
    }

    loadAvatarComponent() {
        var avatar = document.getElementById('avatar');
        var avatarCroppie = new Croppie(avatar, {
            viewport: { width: 100, height: 100 },
            boundary: { width: 300, height: 300 },
            type: 'circle',
            showZoomer: false
        });
        avatarCroppie.bind('app/images/Crimea.jpg');
        avatarCroppie.result('canvas');
    }
}