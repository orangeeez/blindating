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
var preference_1 = require('../../models/preference');
var countries_1 = require('../../static/countries');
var config_1 = require('../../static/config');
var ng2_file_upload_1 = require('ng2-file-upload/ng2-file-upload');
var URL = 'http://localhost:5000/api/user/photo/addbyjwt';
var PmBasicComponent = (function () {
    function PmBasicComponent(_userService, _quoteService, _preferenceService, _questionService, _photoService, _router) {
        var _this = this;
        this._userService = _userService;
        this._quoteService = _quoteService;
        this._preferenceService = _preferenceService;
        this._questionService = _questionService;
        this._photoService = _photoService;
        this._router = _router;
        this.noavatar = config_1.NOAVATAR;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
        this.header = { name: 'Uploader', value: 'basic' };
        this.defaultQuote = 'Please add your favorite quote here';
        this.defaultQuestion = 'Please add your question to others';
        this.defaultAuthor = 'By Author';
        this.quotes = new Array();
        this.questions = new Array();
        this.photos = new Array();
        this.preferences = new preference_1.Preference();
        this.genders = ['Man', 'Woman ', 'Anyway'];
        this.ages = Array.from(Array(80).keys()).slice(16, 80);
        this.cities = [];
        this.countries = countries_1.COUNTRIES;
        this.hcolors = ['Black', 'Brown', 'Red', 'Blond'];
        this.ecolors = ['Grey', 'Green', 'Blue'];
        this.hobbies = ['Football', 'Basketball', 'Golf', 'Other'];
        this.isOpenQuotes = false;
        this.isOpenQuestions = false;
        this.isOpenPhotos = false;
        this.isQuotesArrowShow = false;
        this.isPhotosArrowShow = false;
        this.isQuestionsArrowShow = false;
        this.isTalksArrowShow = false;
        this.filterInputDropdownCountry = function (country) {
            return country.includes(_this.preferences.country);
        };
        this.filterInputDropdownCity = function (city) {
            return city.includes(_this.preferences.city);
        };
        this.uploader.options.removeAfterUpload = true;
        this.uploader.options.headers = [];
        this.uploader.options.headers.push(this.header);
    }
    PmBasicComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.uploader.onAfterAddingFile = function (item) {
            _this.uploader.uploadItem(item);
        };
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            _this.app.user.image = response;
        };
        this._quoteService.GetAllByID(this.app.selectedUser.id)
            .subscribe(function (quotes) { return _this.quotes = quotes.reverse(); });
        //this._preferenceService.GetAllByID(this.app.selectedUser.id)
        //    .subscribe(preference => this.preferences = preference);
        this._questionService.GetAllByID(this.app.selectedUser.id)
            .subscribe(function (questions) { return _this.questions = questions.reverse(); });
        this._photoService.GetAllByID(this.app.selectedUser.id)
            .subscribe(function (photos) { return _this.photos = photos.reverse(); });
    };
    PmBasicComponent.prototype.onFocusoutName = function () {
        var _this = this;
        this._userService.Update(this.app.selectedUser)
            .subscribe(function (isupdated) {
            _this.app.user = _this.app.selectedUser;
        });
    };
    PmBasicComponent.prototype.onFocusoutPreference = function () {
        this._preferenceService.Update(this.preferences)
            .subscribe(function (isupdated) { });
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
            .subscribe(function (isupdated) { });
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
            case 'talks':
                this.isTalksArrowShow = value;
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
    PmBasicComponent.prototype.onBackQuotes = function () {
        this.isOpenQuotes = false;
    };
    PmBasicComponent.prototype.onBackQuestions = function () {
        this.isOpenQuestions = false;
    };
    PmBasicComponent.prototype.onBackPhotos = function () {
        this.isOpenPhotos = false;
    };
    PmBasicComponent = __decorate([
        core_1.Component({
            selector: 'pm-basic-component',
            templateUrl: 'app/components/profilemenu/pm.basic.component.html',
            styleUrls: ['app/components/profilemenu/pm.basic.component.css'],
            inputs: ['app']
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, quote_service_1.QuoteService, preference_service_1.PreferenceService, question_service_1.QuestionService, photo_service_1.PhotoService, router_1.Router])
    ], PmBasicComponent);
    return PmBasicComponent;
}());
exports.PmBasicComponent = PmBasicComponent;
