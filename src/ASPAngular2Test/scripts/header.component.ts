import {Component} from 'angular2/core'
import {ROUTER_DIRECTIVES} from 'angular2/router'

@Component({
    selector: 'headnav',
    templateUrl: 'app/header.component.html',
    styleUrls: ['app/header.component.css'],
    directives: [ROUTER_DIRECTIVES],
    inputs: ['profileImage']
})

export class HeaderComponent {
    public profileImage: String;
}