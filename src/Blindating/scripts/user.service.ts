import {Http, Response, Headers, RequestOptions} from 'angular2/http'
import {Injectable}     from 'angular2/core'
import {Observable}     from 'rxjs/Observable'
import {User}           from './user'
import {API_ADDRESS}    from './mock/utils'

@Injectable()
export class UserService {
    constructor(private http: Http) { }
    public user: User;
    private api = 'api/user';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    //#region Common
    SaveUserState(user: User) {
        this.user = user;
    }
    //#endregion

    //#region UserRepository
    Register(user: User): Observable<string> {
        let body = JSON.stringify(user);

        return this.http.post(API_ADDRESS + this.api + "/register", body, this.options)
            .map(user => user.text())
            .catch(this.handleError)
    }

    Login(user: User): Observable<User> {
        let body = JSON.stringify(user);

        return this.http.post(API_ADDRESS + this.api + "/login", body, this.options)
            .map(logged => logged.json())
            .catch(this.handleError)
    }

    GetUser(field: string, value: string): Observable<User> {
        let queryObj = {
            Field: field,
            Value: value
        }
        let body = JSON.stringify(queryObj);

        return this.http.post(API_ADDRESS + this.api + "/getuser", body, this.options)
            .map(finded => finded.json())
            .catch(this.handleError)
    }

    GetUsers(jwt: string): Observable<Array<User>> {
        let body = "\"" + jwt + "\"";

        return this.http.post(API_ADDRESS + this.api + "/getusers", body, this.options)
            .map(res => res.json())
            .catch(this.handleError)
    }

    IsExistJWT(jwt: string): Observable<boolean> {
        let body = "\"" + jwt + "\"";

        return this.http.post(API_ADDRESS + this.api + "/isexistjwt", body, this.options)
            .map(res => JSON.parse(res.text()))
            .catch(this.handleError)
    }

    IsExistEmail(email: string): Observable<boolean> {
        let body = "\"" + email + "\"";

        return this.http.post(API_ADDRESS + this.api + "/isexistemail", body, this.options)
            .map(res => JSON.parse(res.text()))
            .catch(this.handleError)
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
    //#endregion

    //#region OnlineUserRepository
    DeleteOnlineUser(userID: string): Observable<boolean> {
        let body = userID;

        return this.http.post(API_ADDRESS + this.api + "/deleteonlineuser", body, this.options)
            .map(res => !!res.text())
            .catch(this.handleError)
    }

    GetOnlineUsers(): Observable<Array<User>>
    {
        return this.http.get(API_ADDRESS + this.api + "/getonlineusers", this.options)
            .map(res => res.json())
            .catch(this.handleError)
    }
    //#endregion
}