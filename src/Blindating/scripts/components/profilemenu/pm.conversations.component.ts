import {
    Component,
    OnInit,
    EventEmitter,
    AfterViewInit
}                              from '@angular/core';
import { Conversation }        from '../../models/conversation';
import { ConversationService } from '../../services/information/conversation.service';
import { AppComponent }        from '../../components/app.component';
@Component({
    selector: 'pm-conversations-component',
    templateUrl: 'app/components/profilemenu/pm.conversations.component.html',
    styleUrls:   ['app/components/profilemenu/pm.conversations.component.css'],
    inputs:      ['app', 'conversations'],
    outputs:     ['onBack']

})
export class PmConversationsComponent implements OnInit, AfterViewInit {

    public app: AppComponent;
    public onBack: EventEmitter<{}> = new EventEmitter();

    public conversations: Array<Conversation>;

    constructor(
        private _conversationService: ConversationService) {
    }

    ngOnInit() { }

    ngAfterViewInit() {
        document.getElementById('profilemenu').scrollTop = 0;
    }

    public onBackConversations(): void {
        this.onBack.emit([]);
    }
}