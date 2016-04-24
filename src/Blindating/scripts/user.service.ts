import {Http, Response, Headers, RequestOptions} from 'angular2/http'
import {Injectable}     from 'angular2/core'
import {Observable}     from 'rxjs/Observable'
import {User}           from './user'

@Injectable()
export class UserService {
    constructor(private http: Http) {}
    private api = 'api/user';

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

    Login(user: User): Observable<string> {
        let body = JSON.stringify(user);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api + "/login", body, options)
            .map(jwt => jwt.text())
            .catch(this.handleError)
    }

    isExist(jwt: string): Observable<boolean> {
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
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}