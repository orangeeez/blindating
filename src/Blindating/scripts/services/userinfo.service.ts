import {Http, Response, Headers, RequestOptions, Jsonp} from 'angular2/http'
import {Injectable}     from 'angular2/core'
import {Observable}     from 'rxjs/Observable'
import {Quote, Photo, Conversation, Preference, Question, Answer, Notification}          from './../utils/user.utils'
import {API_ADDRESS}    from './../mock/utils'


@Injectable()
export class UserInfoService {
    private api = 'api/user';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    GetRandomQuote(userID: string): Observable<Quote> {
        return this.http.post(API_ADDRESS + this.api + "/getrandomquote", userID, this.options)
            .map(res => res.json());
    }

    GetPhotos(userID: string): Observable<Array<Photo>> {
        return this.http.post(API_ADDRESS + this.api + "/getphotos", userID, this.options)
            .map(res => res.json());
    }

    GetConversations(userID: string): Observable<Array<Conversation>> {
        return this.http.post(API_ADDRESS + this.api + "/getconversations", userID, this.options)
            .map(res => res.json());
    }

    AddConversation(conversation: Conversation): Observable<boolean> {
        return this.http.post(API_ADDRESS + this.api + "/addconversation", JSON.stringify(conversation), this.options)
            .map(res => !!res.text());
    }

    GetCities(country: string) {
        return this.http.post(API_ADDRESS + this.api + "/getcities", "\"" + country + "\"", this.options)
            .map(res => res.json());
    }

    GetQuestions(userID: string): Observable<Array<Question>> {
        return this.http.post(API_ADDRESS + this.api + "/getquestions", userID, this.options)
            .map(res => res.json());
    }

    GetPreferences(userID: string): Observable<Preference> {
        return this.http.post(API_ADDRESS + this.api + "/getpreferences", userID, this.options)
            .map(res => res.json());
    }

    SetPreference(userID: number, field: string, value: string): Observable<boolean> {
        let queryObj = {
            UserID: userID,
            Field: field,
            Value: value
        }

        return this.http.post(API_ADDRESS + this.api + "/setpreference", JSON.stringify(queryObj), this.options)
            .map(res => !!res.text());
    }

    SetAnswer(answer: Answer): Observable<boolean> {
        return this.http.post(API_ADDRESS + this.api + "/setanswer", JSON.stringify(answer), this.options)
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

    UpdateNotifications(notifications: Array<Notification>): Observable<boolean> {
        return this.http.post(API_ADDRESS + this.api + "/updatenotifications", JSON.stringify(notifications), this.options)
            .map(res => !!res.text());
    }
}