import {
    Component,
    trigger,
    state,
    style,
    transition,
    animate
}                       from '@angular/core';
import { AppComponent } from '../components/app.component';
import { UserService }  from '../services/user.service';
@Component({
    selector:    'footer-component',
    templateUrl: 'app/components/footer.component.html',
    styleUrls:   ['app/components/footer.component.css'],
    inputs:      ['app'],
    animations:  [
        trigger('searchState', [
            state('deselected', style({
                top: '50px'
            })),
            state('selected', style({
                top: '15px'
            })),
            transition('deselected => selected', animate('300ms ease-in')),
            transition('selected => deselected', animate('300ms ease-out'))
        ])
    ]
})
export class FooterComponent {
    public app:         AppComponent;
    public searchState: string = 'deselected';

    constructor(private _userService: UserService) { }

    public searchToggle() {
        this.searchState = (this.searchState === 'selected' ? 'deselected' : 'selected');
    }
}
