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
        return this.http.post(API_ADDRESS + this.api + "/register", JSON.stringify(user), this.options)
            .map(user => user.text())
            .catch(this.handleError)
    }

    Login(user: User): Observable<User> {
        return this.http.post(API_ADDRESS + this.api + "/login", JSON.stringify(user), this.options)
            .map(logged => logged.json())
            .catch(this.handleError)
    }

    GetUser(field: string, value: string): Observable<User> {
        let queryObj = {
            Field: field,
            Value: value
        }

        return this.http.post(API_ADDRESS + this.api + "/getuser", JSON.stringify(queryObj), this.options)
            .map(finded => finded.json())
            .catch(this.handleError)
    }

    GetUsers(jwt: string): Observable<Array<User>> {
        return this.http.post(API_ADDRESS + this.api + "/getusers", "\"" + jwt + "\"", this.options)
            .map(res => res.json())
            .catch(this.handleError)
    }

    IsExistJWT(jwt: string): Observable<boolean> {
        return this.http.post(API_ADDRESS + this.api + "/isexistjwt", "\"" + jwt + "\"", this.options)
            .map(res => JSON.parse(res.text()))
            .catch(this.handleError)
    }

    IsExistEmail(email: string): Observable<boolean> {
        return this.http.post(API_ADDRESS + this.api + "/isexistemail", "\"" + email + "\"", this.options)
            .map(res => JSON.parse(res.text()))
            .catch(this.handleError)
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
    //#endregion

    //#region OnlineUserRepository
    DeleteOnlineUser(userID: string): Observable<boolean> {
        return this.http.post(API_ADDRESS + this.api + "/deleteonlineuser", userID, this.options)
            .map(res => !!res.text())
            .catch(this.handleError)
    }

    GetOnlineUsers(): Observable<Array<User>> {
        return this.http.get(API_ADDRESS + this.api + "/getonlineusers", this.options)
            .map(res => res.json())
            .catch(this.handleError)
    }
    //#endregion
}