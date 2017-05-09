import {
    Component,
    OnInit,
    AnimationTransitionEvent,
    forwardRef,
    trigger,
    state,
    style,
    transition,
    animate,
    NgZone
}                        from '@angular/core';
import { Router }        from '@angular/router';
import { User }          from '../../models/user';
import { UserService }   from '../../services/user.service';
import { AppComponent }  from '../../components/app.component';
import { MatchQuestion } from '../../models/matchquestion';
import { MatchQuestionService } from '../../services/matchquestion.service';

@Component({
    selector: 'pickup-component',
    templateUrl: 'app/components/router-outlet/pickup.component.html',
    styleUrls:  ['app/components/router-outlet/pickup.component.css'],
    inputs:     ['app'],
    animations: [
        trigger('pickupState', [
            state('deselected', style({
                height: '0px',
                'padding-top': '0px',
            })),
            state('selected', style({
                height: '160px',
                'padding-top': '10px'
            })),
            transition('deselected => selected', animate('300ms ease-in')),
            transition('selected => deselected', animate('300ms ease-out'))
        ])
    ]
})
export class PickupComponent implements OnInit {
    public app:                AppComponent;
    public pickupUser:         User;
    public pickupState:        string = 'deselected';
    public matchQuestions:     MatchQuestion[] = [];
    public indexMatchQuestion: number = 0;

    constructor(
        private _matchQuestionService: MatchQuestionService,
        private _router: Router,
        private _zone: NgZone) {
    }

    ngOnInit() {
        this.pickupUser = new User();

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
    }

    public pickupToggle() {
        this.pickupState = (this.pickupState === 'selected' ? 'deselected' : 'selected');
    }

    public onPickupInvite(): void {
        this.app.selectDeselectUser(this.pickupUser);
        this.app.isSelectedUserYou();
        this.app.isPickupShow = false;
        this.app._helper.onInviteAcceptCall();
        this.pickupToggle();
    }

    public onPickupDecline(): void {
        this.app.isPickupShow = false;
        this.app.isHeaderShow = true;
        this.app.selectedUser = null;
        this._router.navigate(['/dashboard']);  
    }

    public onChooseMatchQuestion = (index: number): void => {
        this.indexMatchQuestion = index;
    }

    public onPickupToggleDone = (event: AnimationTransitionEvent): void => {
        if (event.fromState == 'void')
            return;

        this._matchQuestionService.GetMatchedWith(this.pickupUser.id)
            .subscribe(questions => {
                this._zone.run(() => this.matchQuestions = questions); 
            });
    }
}