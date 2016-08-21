import {Http, Response, Headers, RequestOptions, Jsonp} from 'angular2/http'
import {Injectable}     from 'angular2/core'
import {Observable}     from 'rxjs/Observable'
import {Quote, Photo, Conversation}          from './../utils/user.utils'

@Injectable()
export class UserInfoService {
    private api = 'api/user';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    GetRandomQuote(userID: string): Observable<Quote> {
        let body = userID;

        return this.http.post(this.api + "/getrandomquote", body, this.options)
            .map(res => res.json());
    }

    GetPhotos(userID: string): Observable<Array<Photo>> {
        let body = userID;

        return this.http.post(this.api + "/getphotos", body, this.options)
            .map(res => res.json());
    }

    GetConversations(userID: string): Observable<Array<Conversation>> {
        let body = userID;

        return this.http.post(this.api + "/getconversations", body, this.options)
            .map(res => res.json());
    }

    GetCities(country: string) {
        let body = "\"" + country + "\"";

        return this.http.post(this.api + "/getcities", body, this.options)
            .map(res => res.json());
    }
}