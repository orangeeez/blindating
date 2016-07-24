import {Http, Response, Headers, RequestOptions, Jsonp} from 'angular2/http'
import {Injectable}     from 'angular2/core'
import {Observable}     from 'rxjs/Observable'

@Injectable()
export class SocialService {
    private api = 'api/user';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    GetVKInfo(code: string) {
        let body = "\"" + code + "\"";
        //let headers = new Headers({
        //    'Content-Type': 'application/json'
        //});
        //let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api + "/getvkinfo", body, this.options)
            .map(res => res.json());
    }
}