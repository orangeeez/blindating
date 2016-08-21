import {Http, Response, Headers, RequestOptions, Jsonp} from 'angular2/http'
import {Injectable}     from 'angular2/core'
import {Observable}     from 'rxjs/Observable'

@Injectable()
export class UtilsService {
    private api = 'api/utils';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }
}