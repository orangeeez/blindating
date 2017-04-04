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
var feedback_1 = require('../../models/feedback');
var feedback_service_1 = require('../../services/information/feedback.service');
var PmFeedbacksComponent = (function () {
    function PmFeedbacksComponent(_feedbackService) {
        this._feedbackService = _feedbackService;
        this.keydown = {};
        this.isNegativeIcon = 'fa fa-thumbs-o-down fa-lg';
    }
    PmFeedbacksComponent.prototype.ngOnInit = function () { };
    PmFeedbacksComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['selectedUser']) {
            this._feedbackService.GetAllByID(this.app.selectedUser.id)
                .subscribe(function (feedbacks) { return _this.feedbacks = feedbacks.reverse(); });
        }
    };
    PmFeedbacksComponent.prototype.onKeyupArea = function (event, textarea) {
        if (this.keydown[13] && this.keydown[18]) {
            var feedback = this.createFeedback(textarea.value);
            this._feedbackService.AddOther(feedback).subscribe();
            this.feedbacks.unshift(feedback);
            textarea.value = '';
        }
        this.keydown[event.which] = false;
    };
    PmFeedbacksComponent.prototype.onKeydownArea = function (event) {
        this.keydown[event.which] = true;
    };
    PmFeedbacksComponent.prototype.onClickNegativeIcon = function () {
        if (this.isNegativeIcon == 'fa fa-thumbs-o-down fa-lg')
            this.isNegativeIcon = 'fa fa-thumbs-down fa-lg';
        else
            this.isNegativeIcon = 'fa fa-thumbs-o-down fa-lg';
    };
    PmFeedbacksComponent.prototype.onRemoveFeedback = function (feedback) {
        var _this = this;
        this._feedbackService.Remove(feedback)
            .subscribe(function (isremoved) {
            if (isremoved) {
                var index = _this.feedbacks.indexOf(feedback);
                _this.feedbacks.splice(index, 1);
            }
        });
    };
    PmFeedbacksComponent.prototype.getFeedbackResult = function () {
        return this.isNegativeIcon == 'fa fa-thumbs-o-down fa-lg';
    };
    PmFeedbacksComponent.prototype.createFeedback = function (text) {
        var feedback = new feedback_1.Feedback();
        feedback.remoteUserID = this.app.user.id;
        feedback.informationFeedbackFK = this.app.user.information.id;
        feedback.remoteInfoFeedbackFK = this.app.selectedUser.information.id;
        feedback.result = this.getFeedbackResult();
        feedback.text = text;
        feedback.direction = 'Leaved';
        return feedback;
    };
    PmFeedbacksComponent = __decorate([
        core_1.Component({
            selector: 'pm-feedbacks-component',
            templateUrl: 'app/components/profilemenu/pm.feedbacks.component.html',
            styleUrls: ['app/components/profilemenu/pm.feedbacks.component.css'],
            inputs: ['app', 'selectedUser'],
        }), 
        __metadata('design:paramtypes', [feedback_service_1.FeedbackService])
    ], PmFeedbacksComponent);
    return PmFeedbacksComponent;
}());
exports.PmFeedbacksComponent = PmFeedbacksComponent;
