﻿import {
    Component,
    OnInit,
    EventEmitter,
    AfterViewInit
}                            from '@angular/core';
import { Quote }             from '../../models/quote';
import { QuoteService }      from '../../services/information/quote.service';
import { AppComponent }      from '../../components/app.component';
import { QuoteLike }         from '../../models/quotelike';
import { ProgressPrice }     from '../../static/utils';

@Component({
    selector: 'pm-quotes-component',
    templateUrl: 'app/components/profilemenu/pm.quotes.component.html',
    styleUrls: ['app/components/profilemenu/pm.quotes.component.css'],
    inputs:    ['app', 'quotes'],
    outputs:   ['onBack']

})
export class PmQuotesComponent implements OnInit, AfterViewInit {
    public app: AppComponent;
    public onBack = new EventEmitter();

    public quotes:             Array<Quote>;
    public content:            string;
    public author:             string;
    public indexEditingQuote:  number;

    public isAddingQuote: boolean = false;

    constructor(
        private _quoteService: QuoteService) { }

    ngOnInit() { }

    ngAfterViewInit() {
        document.getElementById('profilemenu').scrollTop = 0;
    }

    public onBackQuotes(): void {
        this.onBack.emit([]);
    }

    public onAddQuote(): void {
        this.isAddingQuote = true;
    }

    public onEditQuote(quote: Quote): void {
        quote.isEditing = true;
        this.indexEditingQuote = this.quotes.indexOf(quote);
    }

    public onRemoveQuote(quote: Quote) {
        quote.isLast = this.quotes.length == 1;
        this._quoteService.Remove(quote)
            .subscribe(isremoved => {
                if (isremoved) {
                    var index: number = this.quotes.indexOf(quote);
                    this.quotes.splice(index, 1);

                    if (quote.isLast)
                        this.app.selectedUser.progress -= ProgressPrice.basic;
                }
            })
    }

    public onUpQuote(quote: Quote): void {
        quote.isAnswered = true;
        quote.isLike     = true;

        quote.up++;
        let qlike: QuoteLike = {
            id: 0,
            quoteLikeFK:  quote.id,
            remoteUserID: this.app.user.id,
            direction:    'Leaved',
            result:       true,
            message:      this.quotes.find(function (q) { return q.id == quote.id }).content,
            updateQuote:  quote,
            informationNotificationFK: this.app.user.information.id,
            remoteInfoNotificationFK:  this.app.selectedUser.information.id,
        }

        this._quoteService.SetLike(qlike).subscribe();
    }

    public onDownQuote(quote: Quote): void {
        quote.isAnswered = true;
        quote.isDislike  = true;

        quote.down++;
        let qlike: QuoteLike = {
            id: 0,
            quoteLikeFK:  quote.id,
            remoteUserID: this.app.user.id,
            direction:    "Leaved",
            result:       false,
            message:      this.quotes.find(function (q) { return q.id == quote.id }).content,
            updateQuote: quote,
            informationNotificationFK: this.app.user.information.id,
            remoteInfoNotificationFK:  this.app.selectedUser.information.id,
        }

        this._quoteService.SetLike(qlike).subscribe();
    }

    public onQuoteKeyup(event: KeyboardEvent, isFormValid: boolean, isEditing: boolean): void {
        var key: number = event.which || event.keyCode;
        switch (key) {
            case 13:
                event.preventDefault();
                var isFirst = this.quotes.length == 0;
                if (isFormValid) {
                    var quote: Quote = {
                        id:                 0,
                        content:            this.content,
                        author:             this.author,
                        up:                 0,
                        down:               0,
                        informationQuoteFK: this.app.selectedUser.information['id'],
                        userID:             this.app.selectedUser.id,
                        isEditing:          false,
                        isAnswered:         false,
                        isLike:             false,
                        isDislike:          false,
                        isFirst:            isFirst,
                        isLast:             false
                    };
                    this.isAddingQuote = false;
                    this.content = '';
                    this.author = '';
                    this._quoteService.Add(quote)
                        .subscribe(id => {
                            quote.id = id;
                            this.quotes.unshift(quote);

                            if (isFirst)
                                this.app.selectedUser.progress += ProgressPrice.basic;
                        })
                }
                break;
            case 27:
                this.isAddingQuote = false;
                this.content = '';
                this.author = '';
                break;
        }
    }

    public onEditQuoteKeydown(event: KeyboardEvent, isFormValid: boolean, quote: Quote): void {
        var key: number = event.which || event.keyCode;
        switch (key) {
            case 13:
                event.preventDefault();
                if (isFormValid) {
                    this._quoteService.Update(quote)
                        .subscribe(isupdated => {
                            this.quotes[this.indexEditingQuote] = quote;
                            quote.isEditing = false;
                        });
                }
                break;
            case 27:
                quote.isEditing = false;
                break;
        }
    } 
}