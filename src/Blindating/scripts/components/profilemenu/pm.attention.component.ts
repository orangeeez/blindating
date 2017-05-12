import {
    Component,
    OnInit,
    OnChanges,
    SimpleChange,
    EventEmitter
}                            from '@angular/core';
import { AppComponent }      from '../../components/app.component';
import { Utils }             from '../../static/utils';

@Component({
    selector: 'pm-attention-component',
    templateUrl: 'app/components/profilemenu/pm.attention.component.html',
    styleUrls:   ['app/components/profilemenu/pm.attention.component.css'],
    inputs:      ['app', 'text'],
})
export class PmAttentionComponent implements OnInit {
    public app: AppComponent;
    public text: string;
    public visible: string;

    constructor() { }
    
    ngOnInit() { }

    public set(text: string, visible: string): void {
        this.text = text;
        this.visible = visible;
    }
}