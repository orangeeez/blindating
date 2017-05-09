import {
    Component,
    OnInit,
    OnChanges,
    SimpleChange
}                            from '@angular/core';
import { MatchQuestion }     from '../../models/matchquestion';
import { MatchAnswer }       from '../../models/matchanswer';
import { Utils }             from '../../static/utils';
import { AppComponent }      from '../../components/app.component';
import { MatchQuestionService } from '../../services/matchquestion.service';

@Component({
    selector:    'pm-matchquestions-component',
    templateUrl: 'app/components/profilemenu/pm.matchquestions.component.html',
    styleUrls:   ['app/components/profilemenu/pm.matchquestions.component.css'],
    inputs:      ['app', 'selectedUser'],
})
export class PmatchquestionsComponent implements OnInit, OnChanges {
    public app: AppComponent;
    public matchQuestions: MatchQuestion[];

    constructor(
        private _matchQuestionService: MatchQuestionService
    ) { }

    ngOnInit() { }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['selectedUser']) {
            if (this.app.isSelectedYou) {
                this._matchQuestionService.GetAllByID(this.app.selectedUser.id)
                    .subscribe(matchQuestions => {
                        this.matchQuestions = matchQuestions;
                        for (var i = 0; i < this.matchQuestions.length; i++)
                            if (!this.matchQuestions[i].isAnswered)
                                Utils.moveArray(this.matchQuestions, i, 0);
                    });
            }
            else {
                this._matchQuestionService.GetMatchedWith(this.app.selectedUser.id)
                    .subscribe(matchQuestions => {
                        this.matchQuestions = matchQuestions;
                    });
            }
        }
    }

    public onAnswer = (index: number): void => {
        this.matchQuestions[index].isAnswered = true;
        this._matchQuestionService.AddOverriden(this.matchQuestions[index])
            .subscribe(progress => {
                this.app.selectedUser.progress += progress;
            });
    }

    public onSkip = (index: number) => {
        this.matchQuestions.splice(index, 1);
    }

    public checkRadio = (matchQuestion: MatchQuestion, matchAnswerID: number): void => {
        matchQuestion.matchAnswerID = matchAnswerID;
    }

    public setRadioStyle = (matchQuestion: MatchQuestion, matchAnswerID: number): string => {
        if (!this.app.isSelectedYou &&
            matchQuestion.remoteMatchAnswerID == matchAnswerID &&
            matchQuestion.matchAnswerID != matchQuestion.remoteMatchAnswerID)
            return 'linethrough red';
        if (matchQuestion.isAnswered &&
            matchQuestion.matchAnswerID == matchAnswerID)
            return 'checked';
        else if (matchQuestion.isAnswered &&
                 matchQuestion.matchAnswerID != matchAnswerID)
            return 'linethrough';
        else if (!matchQuestion.isAnswered)
            return '';
    }

    public setBackgroundColor = (matchQuestion: MatchQuestion): string => {
        if (this.app.isSelectedYou)
            return 'white';
        else if (matchQuestion.matchAnswerID == matchQuestion.remoteMatchAnswerID)
            return 'aliceblue';
        else
            return 'antiquewhite';
    }
}