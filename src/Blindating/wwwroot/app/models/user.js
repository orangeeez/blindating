"use strict";
var User = (function () {
    function User() {
        this.id = 0;
        this.firstname = null;
        this.lastname = null;
        this.email = null;
        this.password = null;
        this.jwt = null;
        this.nickname = null;
        this.image = null;
        this.phrase = null;
        this.online = false;
        this.registered = null;
        this.isVideoShared = false;
        this.reason = null;
        this.peer = null;
    }
    User.EMAIL_ALREADY_EXIST = "User with current email is already registered.";
    User.REGISTERED_SUCCESSFULLY = "Congratulations! You're successfully registered. Please log in.";
    User.AUTHORIZATION_FAILED = "Login failed. Please check entered email/password.";
    return User;
}());
exports.User = User;
