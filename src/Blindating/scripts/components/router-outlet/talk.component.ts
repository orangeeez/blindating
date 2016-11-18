import {
    Component,
    Host,
    Inject,
    OnInit,
    forwardRef
}                        from '@angular/core';
import { Router }        from '@angular/router';
import { UserService }   from '../../services/user.service';
import { User }          from '../../models/user';
import { AppComponent }  from '../../components/app.component';
@Component({
    selector:    'talk-component',
    templateUrl: 'app/components/router-outlet/talk.component.html',
    styleUrls: ['app/components/router-outlet/talk.component.css']
})
export class TalkComponent implements OnInit {
    public app: AppComponent;

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _userService: UserService,
        private _router: Router) {
        this.app = app;
    }

    public ngOnInit() {
        this.app._header.DeselectMenus();
        this.app._header.isTalkActive = true;
    }
}
