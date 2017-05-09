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
var user_1 = require('../../models/user');
var matchquestion_service_1 = require('../../services/matchquestion.service');
var PickupComponent = (function () {
    function PickupComponent(_matchQuestionService, _router, _zone) {
        var _this = this;
        this._matchQuestionService = _matchQuestionService;
        this._router = _router;
        this._zone = _zone;
        this.pickupState = 'deselected';
        this.matchQuestions = [];
        this.indexMatchQuestion = 0;
        this.onChooseMatchQuestion = function (index) {
            _this.indexMatchQuestion = index;
        };
        this.onPickupToggleDone = function (event) {
            if (event.fromState == 'void')
                return;
            _this._matchQuestionService.GetMatchedWith(_this.pickupUser.id)
                .subscribe(function (questions) {
                _this._zone.run(function () { return _this.matchQuestions = questions; });
            });
        };
    }
    PickupComponent.prototype.ngOnInit = function () {
        this.pickupUser = new user_1.User();
        this.pickupUser.id = 2;
        this.pickupUser.firstname = "Viktor";
        this.pickupUser.lastname = "Orkush";
        this.pickupUser.email = "v.orkush@gmail.com";
        this.pickupUser.image = 'images/users/3hqzwa25.agr.jpg';
        this.pickupUser.online = true;
        this.pickupUser.progress = 20;
        this.pickupUser.gradeRating = 5;
        this.pickupUser.countRating = 231;
        this.pickupUser.jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InYub3JrdXNoQGdtYWlsLmNvbSIsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.flhwvv4VCsaKp0grVAbB2RBGJkutHle2CgvvgdoTkDo';
    };
    PickupComponent.prototype.pickupToggle = function () {
        this.pickupState = (this.pickupState === 'selected' ? 'deselected' : 'selected');
    };
    PickupComponent.prototype.onPickupInvite = function () {
        this.app.selectDeselectUser(this.pickupUser);
        this.app.isSelectedUserYou();
        this.app.isPickupShow = false;
        this.app._helper.onInviteAcceptCall();
        this.pickupToggle();
    };
    PickupComponent.prototype.onPickupDecline = function () {
        this.app.isPickupShow = false;
        this.app.isHeaderShow = true;
        this.app.selectedUser = null;
        this._router.navigate(['/dashboard']);
    };
    PickupComponent = __decorate([
        core_1.Component({
            selector: 'pickup-component',
            templateUrl: 'app/components/router-outlet/pickup.component.html',
            styleUrls: ['app/components/router-outlet/pickup.component.css'],
            inputs: ['app'],
            animations: [
                core_1.trigger('pickupState', [
                    core_1.state('deselected', core_1.style({
                        height: '0px',
                        'padding-top': '0px',
                    })),
                    core_1.state('selected', core_1.style({
                        height: '160px',
                        'padding-top': '10px'
                    })),
                    core_1.transition('deselected => selected', core_1.animate('300ms ease-in')),
                    core_1.transition('selected => deselected', core_1.animate('300ms ease-out'))
                ])
            ]
        }), 
        __metadata('design:paramtypes', [matchquestion_service_1.MatchQuestionService, router_1.Router, core_1.NgZone])
    ], PickupComponent);
    return PickupComponent;
}());
exports.PickupComponent = PickupComponent;
