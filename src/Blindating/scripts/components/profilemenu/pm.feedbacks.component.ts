import {
    Component,
    OnInit,
    OnChanges,
    SimpleChange
}                            from '@angular/core';
import { Feedback }          from '../../models/feedback';
import { FeedbackService }   from '../../services/information/feedback.service';
import { AppComponent }      from '../../components/app.component';

@Component({
    selector: 'pm-feedbacks-component',
    templateUrl: 'app/components/profilemenu/pm.feedbacks.component.html',
    styleUrls:   ['app/components/profilemenu/pm.feedbacks.component.css'],
    inputs:      ['app', 'selectedUser'],
})
export class PmFeedbacksComponent implements OnInit, OnChanges {
    public app:       AppComponent;
    public feedbacks: Feedback[];

    public keydown =         {};
    public isPositiveIcon = 'fa fa-thumbs-o-up fa-lg';

    constructor(
        private _feedbackService: FeedbackService) {
    }
    
    ngOnInit() { }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['selectedUser']) {
            this._feedbackService.GetAllByID(this.app.selectedUser.id)
                .subscribe(feedbacks => this.feedbacks = feedbacks);
        }
    }

    public onKeyupArea(event: KeyboardEvent, textarea: HTMLTextAreaElement): void {
        if (this.keydown[13] && this.keydown[18]) {
            var feedback = this.createFeedback(textarea.value);
            this._feedbackService.AddOther(feedback).subscribe();
            this.feedbacks.unshift(feedback);
            textarea.value = '';
        }
        this.keydown[event.which] = false;
    }

    public onKeydownArea(event: KeyboardEvent): void {
        this.keydown[event.which] = true;
    }

    public onClickPositiveIcon(): void {
        if (this.isPositiveIcon == 'fa fa-thumbs-o-up fa-lg')
            this.isPositiveIcon = 'fa fa-thumbs-up fa-lg';
        else
            this.isPositiveIcon = 'fa fa-thumbs-o-up fa-lg';
    }

    public onRemoveFeedback(feedback: Feedback): void {
        this._feedbackService.Remove(feedback)
            .subscribe(isremoved => {
                if (isremoved) {
                    var index: number = this.feedbacks.indexOf(feedback);
                    this.feedbacks.splice(index, 1);
                }
            });
    }

    private isPositive(): boolean {
        if (this.isPositiveIcon == 'fa fa-thumbs-o-up fa-lg')
            return false;
        else
            return true;
    }

    private createFeedback(text: string): Feedback {
        var feedback                   = new Feedback();
        feedback.userID                = this.app.selectedUser.id;
        feedback.remoteUserID          = this.app.user.id;
        feedback.isPositive            = this.isPositive();
        feedback.text                  = text;
        feedback.user                  = this.app.selectedUser;
        feedback.remoteUser            = this.app.user;
        return feedback;
    }
}