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
var quote_service_1 = require("../../services/information/quote.service");
var utils_1 = require("../../static/utils");
var PmQuotesComponent = (function () {
    function PmQuotesComponent(_quoteService) {
        this._quoteService = _quoteService;
        this.onBack = new core_1.EventEmitter();
        this.isAddingQuote = false;
    }
    PmQuotesComponent.prototype.ngOnInit = function () { };
    PmQuotesComponent.prototype.ngAfterViewInit = function () {
        document.getElementById('profilemenu').scrollTop = 0;
    };
    PmQuotesComponent.prototype.onBackQuotes = function () {
        this.onBack.emit([]);
    };
    PmQuotesComponent.prototype.onAddQuote = function () {
        this.isAddingQuote = true;
    };
    PmQuotesComponent.prototype.onEditQuote = function (quote) {
        quote.isEditing = true;
        this.indexEditingQuote = this.quotes.indexOf(quote);
    };
    PmQuotesComponent.prototype.onRemoveQuote = function (quote) {
        var _this = this;
        quote.isLast = this.quotes.length == 1;
        this._quoteService.Remove(quote)
            .subscribe(function (isremoved) {
            if (isremoved) {
                var index = _this.quotes.indexOf(quote);
                _this.quotes.splice(index, 1);
                if (quote.isLast)
                    _this.app.selectedUser.progress -= utils_1.ProgressPrice.basic;
            }
        });
    };
    PmQuotesComponent.prototype.onUpQuote = function (quote) {
        quote.isAnswered = true;
        quote.isLike = true;
        quote.up++;
        var qlike = {
            id: 0,
            quoteLikeFK: quote.id,
            remoteUserID: this.app.user.id,
            direction: 'Leaved',
            result: true,
            message: this.quotes.find(function (q) { return q.id == quote.id; }).content,
            updateQuote: quote,
            informationNotificationFK: this.app.user.information.id,
            remoteInfoNotificationFK: this.app.selectedUser.information.id,
        };
        this._quoteService.SetLike(qlike).subscribe();
    };
    PmQuotesComponent.prototype.onDownQuote = function (quote) {
        quote.isAnswered = true;
        quote.isDislike = true;
        quote.down++;
        var qlike = {
            id: 0,
            quoteLikeFK: quote.id,
            remoteUserID: this.app.user.id,
            direction: "Leaved",
            result: false,
            message: this.quotes.find(function (q) { return q.id == quote.id; }).content,
            updateQuote: quote,
            informationNotificationFK: this.app.user.information.id,
            remoteInfoNotificationFK: this.app.selectedUser.information.id,
        };
        this._quoteService.SetLike(qlike).subscribe();
    };
    PmQuotesComponent.prototype.onQuoteKeyup = function (event, isFormValid, isEditing) {
        var _this = this;
        var key = event.which || event.keyCode;
        switch (key) {
            case 13:
                event.preventDefault();
                var isFirst = this.quotes.length == 0;
                if (isFormValid) {
                    var quote = {
                        id: 0,
                        content: this.content,
                        author: this.author,
                        up: 0,
                        down: 0,
                        informationQuoteFK: this.app.selectedUser.information['id'],
                        userID: this.app.selectedUser.id,
                        isEditing: false,
                        isAnswered: false,
                        isLike: false,
                        isDislike: false,
                        isFirst: isFirst,
                        isLast: false
                    };
                    this.isAddingQuote = false;
                    this.content = '';
                    this.author = '';
                    this._quoteService.Add(quote)
                        .subscribe(function (id) {
                        quote.id = id;
                        _this.quotes.unshift(quote);
                        if (isFirst)
                            _this.app.selectedUser.progress += utils_1.ProgressPrice.basic;
                    });
                }
                break;
            case 27:
                this.isAddingQuote = false;
                this.content = '';
                this.author = '';
                break;
        }
    };
    PmQuotesComponent.prototype.onEditQuoteKeydown = function (event, isFormValid, quote) {
        var _this = this;
        var key = event.which || event.keyCode;
        switch (key) {
            case 13:
                event.preventDefault();
                if (isFormValid) {
                    this._quoteService.Update(quote)
                        .subscribe(function (isupdated) {
                        _this.quotes[_this.indexEditingQuote] = quote;
                        quote.isEditing = false;
                    });
                }
                break;
            case 27:
                quote.isEditing = false;
                break;
        }
    };
    return PmQuotesComponent;
}());
PmQuotesComponent = __decorate([
    core_1.Component({
        selector: 'pm-quotes-component',
        templateUrl: 'app/components/profilemenu/pm.quotes.component.html',
        styleUrls: ['app/components/profilemenu/pm.quotes.component.css'],
        inputs: ['app', 'quotes'],
        outputs: ['onBack']
    }),
    __metadata("design:paramtypes", [quote_service_1.QuoteService])
], PmQuotesComponent);
exports.PmQuotesComponent = PmQuotesComponent;
