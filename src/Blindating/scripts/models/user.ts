export class User {
    id:          number  = 0;
    firstname:   string  = null;
    lastname:    string  = null;
    email:       string  = null;
    password:    string  = null;
    jwt:         string  = null;
    nickname:    string  = null;
    image:       string  = null;
    phrase:      string  = null;
    online:      boolean = false;
    registered:  string = null;
    information: any;

    // not mapped
    conversationsCount: number;
    feedbacksCount:     number;
    answersCount:       number;
    isVideoShared: boolean = false;
    reason:        string  = null;
    peer:          any     = null;

    static EMAIL_ALREADY_EXIST = "User with current email is already registered.";
    static REGISTERED_SUCCESSFULLY = "Congratulations! You're successfully registered. Please log in.";
    static AUTHORIZATION_FAILED = "Login failed. Please check entered email/password.";
    static REGISTER_SOCIAL = "Please fill the remaining fields."

}