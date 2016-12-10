"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var question_service_1 = require('../../services/information/question.service');
var PmQuestionsComponent = (function () {
    function PmQuestionsComponent(_questionService) {
        this._questionService = _questionService;
        this.onBack = new core_1.EventEmitter();
        this.isAddingQuestion = false;
    }
    PmQuestionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._questionService.GetAllByID(this.app.selectedUser.id)
            .subscribe(function (questions) { return _this.questions = questions; });
    };
    PmQuestionsComponent.prototype.ngAfterViewInit = function () {
        document.getElementById('profilemenu').scrollTop = 0;
    };
    PmQuestionsComponent.prototype.onBackQuestions = function () {
        this.onBack.emit([]);
    };
    PmQuestionsComponent.prototype.onAddQuestion = function () {
        this.isAddingQuestion = true;
    };
    PmQuestionsComponent.prototype.onEditQuestion = function (question) {
        question.isEditing = true;
        this.indexEditingQuestion = this.questions.indexOf(question);
    };
    PmQuestionsComponent.prototype.onRemoveQuestion = function (quote) {
        var _this = this;
        this._questionService.Remove(quote)
            .subscribe(function (isremoved) {
            if (isremoved) {
                var index = _this.questions.indexOf(quote);
                _this.questions.splice(index, 1);
            }
        });
    };
    PmQuestionsComponent.prototype.onQuestionKeyup = function (event, isFormValid) {
        var _this = this;
        var key = event.which || event.keyCode;
        switch (key) {
            case 13:
                if (isFormValid) {
                    var question = {
                        id: 0,
                        message: this.message,
                        informationQuestionFK: this.app.selectedUser.information['id'],
                        userid: this.app.selectedUser.id,
                        isEditing: false,
                        answered: null
                    };
                    this.isAddingQuestion = false;
                    this.message = '';
                    this._questionService.Add(question)
                        .subscribe(function (id) {
                        question.id = id;
                        _this.questions.unshift(question);
                    });
                }
                break;
            case 27:
                this.isAddingQuestion = false;
                this.message = '';
                break;
        }
    };
    PmQuestionsComponent.prototype.onEditQuestionKeydown = function (event, isFormValid, question) {
        var _this = this;
        var key = event.which || event.keyCode;
        switch (key) {
            case 13:
                event.preventDefault();
                if (isFormValid) {
                    this._questionService.Update(question)
                        .subscribe(function (usupdated) {
                        _this.questions[_this.indexEditingQuestion] = question;
                        question.isEditing = false;
                    });
                }
                break;
            case 27:
                question.isEditing = false;
                break;
        }
    };
    PmQuestionsComponent = __decorate([
        core_1.Component({
            selector: 'pm-questions-component',
            templateUrl: 'app/components/profilemenu/pm.questions.component.html',
            styleUrls: ['app/components/profilemenu/pm.questions.component.css'],
            inputs: ['app', 'questions'],
            outputs: ['onBack']
        }), 
        __metadata('design:paramtypes', [question_service_1.QuestionService])
    ], PmQuestionsComponent);
    return PmQuestionsComponent;
}());
exports.PmQuestionsComponent = PmQuestionsComponent;
