export class User {
    ID: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    JWT: string;
    
    static EMAIL_ALREADY_EXIST = "User with current email is already registered.";
    static REGISTERED_SUCCESSFULLY = "Congratulations! You're successfully registered. Please log in.";
    static AUTHORIZATION_FAILED = "Login failed. Please check entered email/password.";
}
