import {Http, Response, Headers, RequestOptions} from 'angular2/http'
import {Injectable}     from 'angular2/core'
import {Observable}     from 'rxjs/Observable'
import {User}           from './user'

@Injectable()
export class UserService {
    constructor(private http: Http) { }
    public user: User;
    private api = 'api/user';

    //#region Common
    SaveUserState(user: User) {
        this.user = user;
    }
    //#endregion

    //#region UserRepository
    Register(user: User): Observable<string> {
        let body = JSON.stringify(user);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api + "/register", body, options)
            .map(user => user.text())
            .catch(this.handleError)
    }

    Login(user: User): Observable<User> {
        let body = JSON.stringify(user);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api + "/login", body, options)
            .map(logged => logged.json())
            .catch(this.handleError)
    }

    GetUser(field: string, value: string): Observable<User> {
        let queryObj = {
            Field: field,
            Value: value
        }
        let body = JSON.stringify(queryObj);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api + "/getuser", body, options)
            .map(finded => finded.json())
            .catch(this.handleError)
    }

    GetUsers(): Observable<Array<User>> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.api + "/getusers", options)
            .map(res => res.json())
            .catch(this.handleError)
    }

    IsExist(jwt: string): Observable<boolean> {
        let body = jwt;
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api + "/isexist", body, options)
            .map(res => !!res.text())
            .catch(this.handleError)
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
    //#endregion

    //#region OnlineUserRepository
    DeleteOnlineUser(userID: string): Observable<boolean> {
        let body = userID;
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api + "/deleteonlineuser", body, options)
            .map(res => !!res.text())
            .catch(this.handleError)
    }

    GetOnlineUsers(): Observable<Array<User>>
    {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.api + "/getonlineusers", options)
            .map(res => res.json())
            .catch(this.handleError)
    }
    //#endregion
}