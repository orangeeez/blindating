export class User {
    id:          number  = 0;
    firstname:   string  = null;
    lastname:    string  = null;
    email:       string  = null;
    password:    string  = null;
    jwt:         string  = null;
    nickname:    string  = null;
    image:       string  = null;
    online:      boolean = false;
    information: any;
    // not mapped
    reason:     string  = null;
    peer:       any     = null;

    static EMAIL_ALREADY_EXIST = "User with current email is already registered.";
    static REGISTERED_SUCCESSFULLY = "Congratulations! You're successfully registered. Please log in.";
    static AUTHORIZATION_FAILED = "Login failed. Please check entered email/password.";
}