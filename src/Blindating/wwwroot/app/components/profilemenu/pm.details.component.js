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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var detail_service_1 = require("../../services/information/detail.service");
var utils_1 = require("../../static/utils");
var moment = require("moment");
var details_1 = require("../../static/details");
var PmDetailsComponent = (function () {
    function PmDetailsComponent(_detailService) {
        this._detailService = _detailService;
        this.basicInformation = details_1.BASIC_INFORMATION;
        this.basicInformationIcons = details_1.BASIC_INFORMATION_ICONS;
        this.basicInformationDrop = details_1.BASIC_INFORMATION_DROP;
        this.looks = details_1.LOOKS;
        this.looksIcons = details_1.LOOKS_ICONS;
        this.looksDrop = details_1.LOOKS_DROP;
    }
    PmDetailsComponent.prototype.ngOnInit = function () { };
    PmDetailsComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['selectedUser']) {
            this._detailService.GetAllByID(this.app.selectedUser.id)
                .subscribe(function (details) {
                _this.details = details;
                _this.details.birthDate = moment(_this.details.birthDate).format('MM/DD/YYYY');
                if (_this.details.birthDate == '01/01/0001')
                    _this.details.birthDate = '';
            });
        }
    };
    PmDetailsComponent.prototype.onSelectDate = function (property) {
        var _this = this;
        var daypicker = document.getElementsByTagName('daypicker')[0];
        var table = daypicker.getElementsByTagName('table');
        if (table.length == 0)
            return;
        var p = utils_1.Utils.JoinToLowerCase(property);
        var element = document.getElementById(property);
        var dateElement = document.getElementById('date-' + property);
        element['value'] = moment(this.dt).format('MM/DD/YYYY');
        dateElement.hidden = true;
        this.details[p] = new Date(this.dt.setDate(this.dt.getDate() + 1));
        this._detailService.Update(this.details)
            .subscribe(function (progress) {
            _this.app.selectedUser.progress = progress;
        });
    };
    PmDetailsComponent.prototype.onSelectDropdown = function (event, property) {
        var element = document.getElementById(property);
        element['value'] = event.target['innerHTML'];
        this.updateDetail(event.target['innerHTML'], property);
    };
    PmDetailsComponent.prototype.onFocusinInput = function (event, property) {
        var element = document.getElementById('date-' + property);
        if (element)
            element.hidden = false;
        else
            event.preventDefault();
    };
    PmDetailsComponent.prototype.onFocusoutInput = function (event, property) {
        var element = document.getElementById('date-' + property);
        if (!element)
            this.updateDetail(event.target['value'], property);
    };
    PmDetailsComponent.prototype.updateDetail = function (value, property) {
        var _this = this;
        var p = utils_1.Utils.JoinToLowerCase(property);
        if (this.details[p] == value)
            return;
        this.details[p] = value;
        this._detailService.Update(this.details)
            .subscribe(function (progress) {
            _this.app.selectedUser.progress = progress;
        });
    };
    return PmDetailsComponent;
}());
PmDetailsComponent = __decorate([
    core_1.Component({
        selector: 'pm-details-component',
        templateUrl: 'app/components/profilemenu/pm.details.component.html',
        styleUrls: ['app/components/profilemenu/pm.details.component.css'],
        inputs: ['app', 'selectedUser'],
    }),
    __metadata("design:paramtypes", [detail_service_1.DetailService])
], PmDetailsComponent);
exports.PmDetailsComponent = PmDetailsComponent;
