export class User {
    ID: number;
    Firstname: string;
    Lastname: string;
    Email: string;
    Password: string;
    JWT: string;
    Nickname: string;
    Peer: any;
    Reason: string;
    ProfileImage: string;
    
    static EMAIL_ALREADY_EXIST = "User with current email is already registered.";
    static REGISTERED_SUCCESSFULLY = "Congratulations! You're successfully registered. Please log in.";
    static AUTHORIZATION_FAILED = "Login failed. Please check entered email/password.";
}
