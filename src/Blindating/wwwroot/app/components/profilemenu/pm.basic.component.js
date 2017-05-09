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
var router_1 = require('@angular/router');
var user_service_1 = require('../../services/user.service');
var quote_service_1 = require('../../services/information/quote.service');
var preference_service_1 = require('../../services/information/preference.service');
var question_service_1 = require('../../services/information/question.service');
var photo_service_1 = require('../../services/information/photo.service');
var conversation_service_1 = require('../../services/information/conversation.service');
var rating_service_1 = require('../../services/information/rating.service');
var question_1 = require('../../models/question');
var preference_1 = require('../../models/preference');
var countries_1 = require('../../static/countries');
var utils_1 = require('../../static/utils');
var config_1 = require('../../static/config');
var ng2_file_upload_1 = require('ng2-file-upload/ng2-file-upload');
var PmBasicComponent = (function () {
    function PmBasicComponent(_userService, _quoteService, _preferenceService, _questionService, _photoService, _conversationService, _ratingService, _router) {
        var _this = this;
        this._userService = _userService;
        this._quoteService = _quoteService;
        this._preferenceService = _preferenceService;
        this._questionService = _questionService;
        this._photoService = _photoService;
        this._conversationService = _conversationService;
        this._ratingService = _ratingService;
        this._router = _router;
        this.uploader = new ng2_file_upload_1.FileUploader({
            url: config_1.PHOTO_BY_JWT_ADDRESS,
            authToken: 'Bearer ' + localStorage.getItem('id_token')
        });
        this.uploadHeader = { name: 'Uploader', value: 'basic' };
        this.defaultQuote = 'Please add your favorite quote here';
        this.defaultQuoteNotYou = 'User does not add quote yet';
        this.defaultQuestion = 'Please add your question to others here';
        this.defaultAuthor = 'By Author';
        this.questionIndex = 0;
        this.quotes = new Array();
        this.questions = new Array();
        this.photos = new Array();
        this.conversations = new Array();
        this.preferences = new preference_1.Preference();
        this.genders = utils_1.PreferenceData.genders;
        this.ages = Array.from(Array(80).keys()).slice(16, 80);
        this.cities = [];
        this.countries = countries_1.COUNTRIES;
        this.hcolors = utils_1.PreferenceData.hcolors;
        this.ecolors = utils_1.PreferenceData.ecolors;
        this.hobbies = utils_1.PreferenceData.hobbies;
        this.isOpenQuotes = false;
        this.isOpenQuestions = false;
        this.isOpenPhotos = false;
        this.isOpenConversations = false;
        this.isQuotesArrowShow = false;
        this.isPhotosArrowShow = false;
        this.isQuestionsArrowShow = false;
        this.isConversationsArrowShow = false;
        this.isQuotesLoaded = false;
        this.isPreferenceLoaded = false;
        this.isQuestionsLoaded = false;
        this.isPhotosLoaded = false;
        this.isConversationsLoaded = false;
        this.GetQuestions = function () {
            if (_this.app.user.id == _this.app.selectedUser.id) {
                _this._questionService.GetAllByID(_this.app.selectedUser.id)
                    .subscribe(function (questions) {
                    _this.questions = questions.reverse();
                    _this.isQuestionsLoaded = true;
                });
            }
            else {
                _this._questionService.GetNotAnsweredByID(_this.app.selectedUser.id)
                    .subscribe(function (questions) {
                    _this.questions = questions.reverse();
                    _this.isQuestionsLoaded = true;
                });
            }
        };
        this.onShowAnswers = function () {
            _this._questionService.GetAllByID(_this.app.selectedUser.id)
                .subscribe(function (questions) {
                _this.questions = questions.reverse();
                _this.isQuestionsLoaded = true;
            });
        };
        this.filterInputDropdownCountry = function (country) {
            return country.includes(_this.preferences.country);
        };
        this.filterInputDropdownCity = function (city) {
            return city.includes(_this.preferences.city);
        };
        this.uploader.options.removeAfterUpload = true;
        this.uploader.options.headers = [];
        this.uploader.options.headers.push(this.uploadHeader);
        this.uploader.onAfterAddingFile = function (item) {
            _this.uploader.uploadItem(item);
        };
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            _this.app.user.image = response;
        };
    }
    PmBasicComponent.prototype.ngOnInit = function () { };
    PmBasicComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['selectedUser']) {
            this.changeProfileLoading();
            this._quoteService.GetAllByID(this.app.selectedUser.id)
                .subscribe(function (quotes) {
                _this.quotes = quotes.reverse();
                _this.isQuotesLoaded = true;
            });
            this._preferenceService.GetAllByID(this.app.selectedUser.id)
                .subscribe(function (preference) {
                _this.preferences = preference;
                _this.isPreferenceLoaded = true;
            });
            this._photoService.GetAllByID(this.app.selectedUser.id)
                .subscribe(function (photos) {
                _this.photos = photos.reverse();
                _this.isPhotosLoaded = true;
            });
            this._conversationService.GetAllByID(this.app.selectedUser.id)
                .subscribe(function (conversations) {
                _this.conversations = conversations.reverse();
                _this.isConversationsLoaded = true;
            });
            this.GetQuestions();
        }
    };
    PmBasicComponent.prototype.onFocusoutName = function () {
        var _this = this;
        this._userService.Update(this.app.selectedUser)
            .subscribe(function (isupdated) {
            _this.app.user = _this.app.selectedUser;
        });
    };
    PmBasicComponent.prototype.onFocusoutPreference = function () {
        var _this = this;
        this._preferenceService.Update(this.preferences)
            .subscribe(function (progress) {
            _this.app.selectedUser.progress = progress;
        });
    };
    PmBasicComponent.prototype.onSelectPreference = function (event, input) {
        var _this = this;
        var element = event.target;
        switch (element['id']) {
            case 'gender':
                this.preferences.gender = element['innerHTML'];
                break;
            case 'age-from':
                this.preferences.from = element['innerHTML'];
                break;
            case 'age-to':
                this.preferences.to = element['innerHTML'];
                break;
            case 'country':
                this.preferences.country = element['innerHTML'];
                this.preferences.city = '';
                this._preferenceService.GetCities(this.preferences.country)
                    .subscribe(function (cities) {
                    _this.cities = cities;
                    _this.CITIES = cities;
                });
                break;
            case 'city':
                this.preferences.city = element['innerHTML'];
                break;
            case 'hcolor':
                this.preferences.hcolor = element['innerHTML'];
                break;
            case 'ecolor':
                this.preferences.ecolor = element['innerHTML'];
                break;
            case 'hobby':
                if (element['innerHTML'] == 'Other') {
                    this.preferences.hobby = '';
                    input['readOnly'] = false;
                    input.focus();
                    return;
                }
                else
                    this.preferences.hobby = element['innerHTML'];
                break;
        }
        this._preferenceService.Update(this.preferences)
            .subscribe(function (progress) {
            _this.app.selectedUser.progress = progress;
        });
    };
    PmBasicComponent.prototype.onInputDropdown = function (event) {
        switch (event.target['id']) {
            case 'country-dropdown':
                this.countries = countries_1.COUNTRIES.filter(this.filterInputDropdownCountry);
                break;
            case 'city-dropdown':
                this.cities = this.CITIES.filter(this.filterInputDropdownCity);
                break;
        }
    };
    PmBasicComponent.prototype.onHeaderMouseoverout = function (header, value) {
        switch (header) {
            case 'quotes':
                this.isQuotesArrowShow = value;
                break;
            case 'photos':
                this.isPhotosArrowShow = value;
                break;
            case 'questions':
                this.isQuestionsArrowShow = value;
                break;
            case 'conversations':
                this.isConversationsArrowShow = value;
                break;
        }
    };
    PmBasicComponent.prototype.onOpenQuotes = function () {
        this.isOpenQuotes = true;
        this.isQuotesArrowShow = false;
    };
    PmBasicComponent.prototype.onOpenQuestions = function () {
        this.isOpenQuestions = true;
        this.isQuestionsArrowShow = false;
    };
    PmBasicComponent.prototype.onOpenPhotos = function () {
        this.isOpenPhotos = true;
        this.isPhotosArrowShow = true;
    };
    PmBasicComponent.prototype.onOpenConversations = function () {
        this.isOpenConversations = true;
        this.isConversationsArrowShow = true;
    };
    PmBasicComponent.prototype.onBackQuotes = function () {
        this.isOpenQuotes = false;
    };
    PmBasicComponent.prototype.onBackQuestions = function () {
        this.isOpenQuestions = false;
        this.GetQuestions();
    };
    PmBasicComponent.prototype.onBackPhotos = function () {
        this.isOpenPhotos = false;
    };
    PmBasicComponent.prototype.onBackConversations = function () {
        this.isOpenConversations = false;
    };
    // TODO: Refactor Accept/Decline Answer
    PmBasicComponent.prototype.onAcceptAnswer = function () {
        var answer = {
            id: 0,
            remoteUserID: this.app.user.id,
            questionAnswerFK: this.questions[this.questionIndex].id,
            result: true,
            direction: "Leaved",
            informationQuestionFK: this.app.user.information.id,
            remoteInfoQuestionFK: this.app.selectedUser.information.id,
            remoteUser: null,
            questionAnswered: this.questions[this.questionIndex].message
        };
        if (this.questionIndex < this.questions.length - 1)
            this.questionIndex++;
        else {
            var q = new question_1.Question();
            q.message = "You answered on all questions";
            this.questions = [];
            this.questionIndex = 0;
            this.questions.push(q);
        }
        this._questionService.SetAnswer(answer).subscribe();
    };
    PmBasicComponent.prototype.onDeclineAnswer = function () {
        var answer = {
            id: 0,
            remoteUserID: this.app.user.id,
            questionAnswerFK: this.questions[this.questionIndex].id,
            result: false,
            direction: "Leaved",
            informationQuestionFK: this.app.user.information.id,
            remoteInfoQuestionFK: this.app.selectedUser.information.id,
            remoteUser: null,
            questionAnswered: this.questions[this.questionIndex].message
        };
        if (this.questionIndex < this.questions.length - 1)
            this.questionIndex++;
        else {
            var q = new question_1.Question();
            q.message = "You answered on all questions";
            this.questions = [];
            this.questionIndex = 0;
            this.questions.push(q);
        }
        this._questionService.SetAnswer(answer).subscribe();
    };
    PmBasicComponent.prototype.setBasicComponentShow = function () {
        this.isOpenQuotes = false;
        this.isOpenQuestions = false;
        this.isOpenPhotos = false;
        this.isOpenConversations = false;
    };
    PmBasicComponent.prototype.changeProfileLoading = function () {
        this.isQuotesLoaded = false;
        this.isPreferenceLoaded = false;
        this.isQuestionsLoaded = false;
        this.isPhotosLoaded = false;
        this.isConversationsLoaded = false;
        this.isOpenQuotes = false;
        this.isOpenQuestions = false;
        this.isOpenPhotos = false;
        this.isOpenConversations = false;
    };
    PmBasicComponent = __decorate([
        core_1.Component({
            selector: 'pm-basic-component',
            templateUrl: 'app/components/profilemenu/pm.basic.component.html',
            styleUrls: ['app/components/profilemenu/pm.basic.component.css'],
            inputs: ['app', 'selectedUser', 'isOpenQuotes']
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, quote_service_1.QuoteService, preference_service_1.PreferenceService, question_service_1.QuestionService, photo_service_1.PhotoService, conversation_service_1.ConversationService, rating_service_1.RatingService, router_1.Router])
    ], PmBasicComponent);
    return PmBasicComponent;
}());
exports.PmBasicComponent = PmBasicComponent;
