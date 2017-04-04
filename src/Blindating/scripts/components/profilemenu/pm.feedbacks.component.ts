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
    public isNegativeIcon = 'fa fa-thumbs-o-down fa-lg';

    constructor(
        private _feedbackService: FeedbackService) {
    }
    
    ngOnInit() { }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['selectedUser']) {
            this._feedbackService.GetAllByID(this.app.selectedUser.id)
                .subscribe(feedbacks => this.feedbacks = feedbacks.reverse());
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

    public onClickNegativeIcon(): void {
        if (this.isNegativeIcon == 'fa fa-thumbs-o-down fa-lg')
            this.isNegativeIcon = 'fa fa-thumbs-down fa-lg';
        else
            this.isNegativeIcon = 'fa fa-thumbs-o-down fa-lg';
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

    private getFeedbackResult(): boolean {
        return this.isNegativeIcon == 'fa fa-thumbs-o-down fa-lg';
    }

    private createFeedback(text: string): Feedback {
        var feedback                   = new Feedback();
        feedback.remoteUserID          = this.app.user.id;
        feedback.informationFeedbackFK = this.app.user.information.id;
        feedback.remoteInfoFeedbackFK  = this.app.selectedUser.information.id;
        feedback.result                = this.getFeedbackResult();
        feedback.text                  = text;
        feedback.direction             = 'Leaved';
        return feedback;
    }
}