"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_ADDRESS = document.location.protocol + "//" +
    document.location.hostname + ":" +
    document.location.port + "/";
exports.HANGUP = 'images/app/controls/phone-hang-up.svg';
exports.HANGUP_INACTIVE = 'images/app/controls/phone-hang-up-inactive.svg';
exports.PHONE = 'images/app/controls/phone.svg';
exports.PHONE_INACTIVE = 'images/app/controls/phone-inactive.svg';
exports.VIDEO = 'images/app/controls/video-camera.svg';
exports.VIDEO_INACTIVE = 'images/app/controls/video-camera-inactive.svg';
exports.SMILES = [
    'images/app/smiles/1.svg',
    'images/app/smiles/2.svg',
    'images/app/smiles/3.svg',
    'images/app/smiles/4.svg',
    'images/app/smiles/5.svg',
    'images/app/smiles/6.svg',
];
exports.PHOTO_BY_JWT_ADDRESS = exports.API_ADDRESS + 'api/user/photo/addbyjwt';
