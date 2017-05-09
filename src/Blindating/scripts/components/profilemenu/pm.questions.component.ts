import {
    Component,
    OnInit,
    OnDestroy,
    EventEmitter,
    AfterViewInit
}                            from '@angular/core';
import { Question }          from '../../models/question';
import { QuestionService }   from '../../services/information/question.service';
import { AppComponent }      from '../../components/app.component';
import { ProgressPrice }     from '../../static/utils';

@Component({
    selector:  'pm-questions-component',
    templateUrl: 'app/components/profilemenu/pm.questions.component.html',
    styleUrls: ['app/components/profilemenu/pm.questions.component.css'],
    inputs:    ['app', 'questions'],
    outputs:   ['onBack']

})
export class PmQuestionsComponent implements OnInit, OnDestroy, AfterViewInit {
    public app: AppComponent;
    public onBack = new EventEmitter();

    public questions:            Array<Question>;
    public message:              string;
    public indexEditingQuestion: number;

    public isAddingQuestion: boolean = false;

    constructor(
        private _questionService: QuestionService) { }

    ngOnInit() {
        console.log(this.questions);
    }

    ngOnDestroy() { }

    ngAfterViewInit() {
        document.getElementById('profilemenu').scrollTop = 0;
    }

    public onBackQuestions(): void {
        this.onBack.emit([]);
    }

    public onAddQuestion(): void {
        this.isAddingQuestion = true;
    }

    public onEditQuestion(question: Question): void {
        question.isEditing = true;
        this.indexEditingQuestion = this.questions.indexOf(question);
    }

    public onRemoveQuestion(question: Question): void {
        question.isLast = this.questions.length == 1;

        this._questionService.Remove(question)
            .subscribe(isremoved => {
                if (isremoved) {
                    var index: number = this.questions.indexOf(question);
                    this.questions.splice(index, 1);

                    if (question.isLast)
                        this.app.selectedUser.progress -= ProgressPrice.basic;
                }
            })
    }

    public onQuestionKeyup(event: KeyboardEvent, isFormValid: boolean): void {
        var key: number = event.which || event.keyCode;
        switch (key) {
            case 13:
                var isFirst = this.questions.length == 0;
                if (isFormValid) {
                    var question: Question = {
                        id:                    0,
                        message:               this.message,
                        informationQuestionFK: this.app.selectedUser.information['id'],
                        userID:                this.app.selectedUser.id,
                        isEditing:             false,
                        answered:              false,
                        answersCount:          0,
                        isFirst:               isFirst,
                        isLast:                false
                    };
                    this.isAddingQuestion = false;
                    this.message       = '';
                    this._questionService.Add(question)
                        .subscribe(id => {
                            question.id = id;
                            this.questions.unshift(question);

                            if (isFirst)
                                this.app.selectedUser.progress += ProgressPrice.basic;
                        })
                }
                break;
            case 27:
                this.isAddingQuestion = false;
                this.message          = '';
                break;
        }
    }
    public onEditQuestionKeydown(event: KeyboardEvent, isFormValid: boolean, question: Question): void {
        var key: number = event.which || event.keyCode;
        switch (key) {
            case 13:
                event.preventDefault();
                if (isFormValid) {
                    this._questionService.Update(question)
                        .subscribe(usupdated => {
                            this.questions[this.indexEditingQuestion] = question;
                            question.isEditing = false;
                        });
                }
                break;
            case 27:
                question.isEditing = false;
                break;
        }
    }
}