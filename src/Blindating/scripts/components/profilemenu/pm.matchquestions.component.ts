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
export class PmatchquestionsComponent implements OnInit {
    public app: AppComponent;
    public matchQuestions: MatchQuestion[];
    public isComparing: boolean = false;

    constructor(
        private _matchQuestionService: MatchQuestionService
    ) { }

    ngOnInit() {
        console.log('init');

        if (this.app.isSelectedYou) {
            console.log('you');

            this._matchQuestionService.GetAllByID(this.app.selectedUser.id)
                .subscribe(questions => {
                    this.matchQuestions = questions;
                    for (var i = 0; i < this.matchQuestions.length; i++)
                        if (!this.matchQuestions[i].isAnswered)
                            Utils.moveArray(this.matchQuestions, i, 0);
                });
        }
        else {
            console.log('not you');
            this._matchQuestionService.GetMatchedWith(this.app.selectedUser.id)
                .subscribe(questions => {
                    this.isComparing = true;
                    console.log(questions);
                });
        }
    }

    public onAnswer = (index: number, matchAnswerID: number): void => {
        this.matchQuestions[index].isAnswered = true;
        this._matchQuestionService.AddOverriden(this.matchQuestions[index]).subscribe();
    }

    public onSkip = (index: number) => {
        this.matchQuestions.splice(index, 1);
    }

    public checkRadio = (matchQuestion: MatchQuestion, matchAnswerID: number): void => {
        matchQuestion.matchAnswerID = matchAnswerID;
    }

    public setRadioStyle = (matchQuestion: MatchQuestion, matchAnswerID: number): string => {
        if (matchQuestion.isAnswered &&
            matchQuestion.matchAnswerID == matchAnswerID)
            return 'checked';
        else if (matchQuestion.isAnswered &&
            matchQuestion.matchAnswerID != matchAnswerID)
            return 'linethrough';
        else if (!matchQuestion.isAnswered)
            return '';
    }
}