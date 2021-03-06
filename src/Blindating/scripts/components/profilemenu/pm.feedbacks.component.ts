﻿import {
    Component,
    OnInit,
    OnChanges,
    SimpleChange,
    ViewChild
}                            from '@angular/core';
import { Feedback }          from '../../models/feedback';
import { FeedbackService }   from '../../services/information/feedback.service';
import { AppComponent }      from '../../components/app.component';
import { ProgressPrice }     from '../../static/utils';
import { PmAttentionComponent } from './pm.attention.component';

@Component({
    selector: 'pm-feedbacks-component',
    templateUrl: 'app/components/profilemenu/pm.feedbacks.component.html',
    styleUrls:   ['app/components/profilemenu/pm.feedbacks.component.css'],
    inputs:      ['app', 'selectedUser'],
})
export class PmFeedbacksComponent implements OnInit, OnChanges {
    @ViewChild(PmAttentionComponent) attentionComponent: PmAttentionComponent;

    public app:       AppComponent;
    public feedbacks: Feedback[];

    public keydown =         {};
    public isNegativeIcon = 'fa fa-thumbs-o-down fa-lg';
    public isAttentionVisible: string = 'hidden';
    public attentionText: string;

    constructor(
        private _feedbackService: FeedbackService) {
    }
    
    ngOnInit() { }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['selectedUser']) {
            if (!this.app.selectedUser.isVideoShared &&
                !this.app.isSelectedYou)
                this.attentionComponent.set('Before leave a wish you need a conversation with this user.', 'visible');
            else
                this.attentionComponent.set('', 'hidden');

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
        feedback.isLast = this.feedbacks.length == 1;
        this._feedbackService.Remove(feedback)
            .subscribe(isremoved => {
                if (isremoved) {
                    var index: number = this.feedbacks.indexOf(feedback);
                    this.feedbacks.splice(index, 1);

                    if (feedback.isLast)
                        this.app.selectedUser.progress -= ProgressPrice.feedbacks;
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
        feedback.remoteJWT             = this.app.selectedUser.jwt;
        feedback.direction             = 'Leaved';
        feedback.isFirst               = this.feedbacks.length == 0;
        return feedback;
    }
}