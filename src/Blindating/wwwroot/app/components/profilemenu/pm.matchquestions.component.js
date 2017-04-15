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
var utils_1 = require('../../static/utils');
var matchquestion_service_1 = require('../../services/matchquestion.service');
var PmatchquestionsComponent = (function () {
    function PmatchquestionsComponent(_matchQuestionService) {
        var _this = this;
        this._matchQuestionService = _matchQuestionService;
        this.isComparing = false;
        this.onAnswer = function (index, matchAnswerID) {
            _this.matchQuestions[index].isAnswered = true;
            _this._matchQuestionService.AddOverriden(_this.matchQuestions[index]).subscribe();
        };
        this.onSkip = function (index) {
            _this.matchQuestions.splice(index, 1);
        };
        this.checkRadio = function (matchQuestion, matchAnswerID) {
            matchQuestion.matchAnswerID = matchAnswerID;
        };
        this.setRadioStyle = function (matchQuestion, matchAnswerID) {
            if (matchQuestion.isAnswered &&
                matchQuestion.matchAnswerID == matchAnswerID)
                return 'checked';
            else if (matchQuestion.isAnswered &&
                matchQuestion.matchAnswerID != matchAnswerID)
                return 'linethrough';
            else if (!matchQuestion.isAnswered)
                return '';
        };
    }
    PmatchquestionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('init');
        if (this.app.isSelectedYou) {
            console.log('you');
            this._matchQuestionService.GetAllByID(this.app.selectedUser.id)
                .subscribe(function (questions) {
                _this.matchQuestions = questions;
                for (var i = 0; i < _this.matchQuestions.length; i++)
                    if (!_this.matchQuestions[i].isAnswered)
                        utils_1.Utils.moveArray(_this.matchQuestions, i, 0);
            });
        }
        else {
            console.log('not you');
            this._matchQuestionService.GetMatchedWith(this.app.selectedUser.id)
                .subscribe(function (questions) {
                _this.isComparing = true;
                console.log(questions);
            });
        }
    };
    PmatchquestionsComponent = __decorate([
        core_1.Component({
            selector: 'pm-matchquestions-component',
            templateUrl: 'app/components/profilemenu/pm.matchquestions.component.html',
            styleUrls: ['app/components/profilemenu/pm.matchquestions.component.css'],
            inputs: ['app', 'selectedUser'],
        }), 
        __metadata('design:paramtypes', [matchquestion_service_1.MatchQuestionService])
    ], PmatchquestionsComponent);
    return PmatchquestionsComponent;
}());
exports.PmatchquestionsComponent = PmatchquestionsComponent;
