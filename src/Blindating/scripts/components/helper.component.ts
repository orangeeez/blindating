import { Component }   from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
    selector:    'helper-component',
    templateUrl: 'app/components/helper.component.html',
    styleUrls:   ['app/components/helper.component.css'],
    providers:   [UserService]
})
export class HelperComponent {
    constructor(private _userService: UserService) {}
}
