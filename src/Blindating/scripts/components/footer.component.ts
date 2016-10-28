import { Component }   from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
    selector:    'footer-component',
    templateUrl: 'app/components/footer.component.html',
    styleUrls:   ['app/components/footer.component.css'],
    providers:   [UserService]
})
export class FooterComponent {
    constructor(private _userService: UserService) { }
}
