import {Http, Response, Headers, RequestOptions, Jsonp} from 'angular2/http'
import {Injectable}     from 'angular2/core'
import {Observable}     from 'rxjs/Observable'
import {Quote, Photo, Conversation, Preference, Question, Answer}          from './../utils/user.utils'
import {API_ADDRESS}    from './../mock/utils'


@Injectable()
export class UserInfoService {
    private api = 'api/user';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    GetRandomQuote(userID: string): Observable<Quote> {
        let body = userID;

        return this.http.post(API_ADDRESS + this.api + "/getrandomquote", body, this.options)
            .map(res => res.json());
    }

    GetPhotos(userID: string): Observable<Array<Photo>> {
        let body = userID;

        return this.http.post(API_ADDRESS + this.api + "/getphotos", body, this.options)
            .map(res => res.json());
    }

    GetConversations(userID: string): Observable<Array<Conversation>> {
        let body = userID;

        return this.http.post(API_ADDRESS + this.api + "/getconversations", body, this.options)
            .map(res => res.json());
    }

    GetCities(country: string) {
        let body = "\"" + country + "\"";

        return this.http.post(API_ADDRESS + this.api + "/getcities", body, this.options)
            .map(res => res.json());
    }

    GetQuestions(userID: string): Observable<Array<Question>> {
        let body = userID;

        return this.http.post(API_ADDRESS + this.api + "/getquestions", body, this.options)
            .map(res => res.json());
    }

    GetPreferences(userID: string): Observable<Preference> {
        let body = userID;

        return this.http.post(API_ADDRESS + this.api + "/getpreferences", body, this.options)
            .map(res => res.json());
    }

    SetPreference(userID: number, field: string, value: string): Observable<boolean> {
        let queryObj = {
            UserID: userID,
            Field: field,
            Value: value
        }
        let body = JSON.stringify(queryObj);

        return this.http.post(API_ADDRESS + this.api + "/setpreference", body, this.options)
            .map(res => !!res.text());
    }

    SetAnswer(answer: Answer): Observable<boolean> {
        let body = JSON.stringify(answer);

        return this.http.post(API_ADDRESS + this.api + "/setanswer", body, this.options)
            .map(res => !!res.text());
    }

    GetAnswerNotification(answerID: string): Observable<any> {
        return this.http.post(API_ADDRESS + this.api + "/getanswernotification", answerID, this.options)
            .map(res => res.json());
    }

    GetNotifications(userID: string): Observable<Array<string>> {
        return this.http.post(API_ADDRESS + this.api + "/getnotifications", userID, this.options)
            .map(res => res.json());
    }
}