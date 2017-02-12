import {
    Component,
    OnInit,
    trigger,
    state,
    style,
    transition,
    animate
}                       from '@angular/core';
import { AppComponent } from '../../components/app.component';
import { SearchData }   from '../../static/utils';
import { Message }      from '../../models/message';
import { SMILES }       from '../../static/config';

@Component({
    selector:    'f-smiley-component',
    templateUrl: 'app/components/footer/f.smiley.component.html',
    styleUrls:  ['app/components/footer/f.smiley.component.css'],
    inputs:     ['app'],
    animations: []
})
export class FSmileyComponent implements OnInit {
    public app:        AppComponent;
    public smiles: string[] = SMILES;
    public ngOnInit() {}

    public onAddSmile(smile: string): void {
        var message = new Message(12, 'message-me', smile);
        this.app._talk.messages.push(message);
        this.app.user.peer.send(JSON.stringify(message), this.app.communicationUser.jwt);
    }
}