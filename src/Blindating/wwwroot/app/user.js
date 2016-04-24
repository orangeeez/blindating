System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User() {
                }
                User.EMAIL_ALREADY_EXIST = "User with current email is already registered.";
                User.REGISTERED_SUCCESSFULLY = "Congratulations! You're successfully registered. Please log in.";
                User.AUTHORIZATION_FAILED = "Login failed. Please check entered email/password.";
                return User;
            }());
            exports_1("User", User);
        }
    }
});
