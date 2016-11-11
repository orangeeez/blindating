import {
    Component,
    OnInit,
    OnChanges,
    SimpleChange,
    EventEmitter
}                            from '@angular/core';
import { Detail }            from '../../models/detail';
import { DetailService }     from '../../services/information/detail.service';
import { AppComponent }      from '../../components/app.component';
import { Utils }             from '../../static/utils';
import * as moment           from 'moment';
import {
    FileUploader,
    Headers,
    FileUploaderOptions
}                            from 'ng2-file-upload/ng2-file-upload';
import {
    BASIC_INFORMATION,
    BASIC_INFORMATION_ICONS,
    BASIC_INFORMATION_DROP,
    LOOKS,
    LOOKS_ICONS,
    LOOKS_DROP
}                            from '../../static/details'

@Component({
    selector: 'pm-details-component',
    templateUrl: 'app/components/profilemenu/pm.details.component.html',
    styleUrls:   ['app/components/profilemenu/pm.details.component.css'],
    inputs:      ['app', 'selectedUser'],
})
export class PmDetailsComponent implements OnInit, OnChanges {
    public app: AppComponent;

    public basicInformation                           = BASIC_INFORMATION;
    public basicInformationIcons                      = BASIC_INFORMATION_ICONS;
    public basicInformationDrop: Array<Array<string>> = BASIC_INFORMATION_DROP;
    public looks                                      = LOOKS;
    public looksIcons                                 = LOOKS_ICONS;
    public looksDrop                                  = LOOKS_DROP;

    public details: Detail;
    public dt:      Date;

    constructor(
        private _detailService: DetailService) {
    }
    
    ngOnInit() { }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['selectedUser']) {
            this._detailService.GetAllByID(this.app.selectedUser.id)
                .subscribe(details => {
                    this.details           = details;
                    this.details.birthDate = moment(this.details.birthDate).format('MM/DD/YYYY');
                });
        }
    }

    public onSelectDate(property: string) {
        var daypicker = document.getElementsByTagName('daypicker')[0];
        var table     = daypicker.getElementsByTagName('table');

        if (table.length == 0) return;
        
        var p           = Utils.JoinToLowerCase(property);
        var element     = document.getElementById(property);
        var dateElement = document.getElementById('date-' + property);

        element['value']   = moment(this.dt).format('MM/DD/YYYY');
        dateElement.hidden = true;

        this.details[p] = new Date(this.dt.setDate(this.dt.getDate() + 1))
        this._detailService.Update(this.details).subscribe();
    }

    public onSelectDropdown(event: Event, property: string): void {
        var element = document.getElementById(property);
        element['value'] = event.target['innerHTML'];
        this.updateDetail(event.target['innerHTML'], property);
    }

    public onFocusinInput(event: Event, property: string): void {
        var element = document.getElementById('date-' + property);
        if (element)
            element.hidden = false;
        else
            event.preventDefault();
    }

    public onFocusoutInput(event: Event, property: string): void {
        var element = document.getElementById('date-' + property);
        if (!element)
            this.updateDetail(event.target['value'], property);
    }

    private updateDetail(value: any, property: string): void {
        var p = Utils.JoinToLowerCase(property);

        if (this.details[p] == value)
            return;

        this.details[p] = value;
        this._detailService.Update(this.details).subscribe();
    }
}