import {Component, EventEmitter} from 'angular2/core'

@Component({
    selector: 'profilemenu',
    templateUrl: 'app/profilemenu.component.html',
    styleUrls: ['app/profilemenu.component.css'],
    inputs: ['myname'],
    outputs: ['myevent']
})

export class ProfileMenuComponent {
    public myname: String;
    public myevent: EventEmitter<any> = new EventEmitter();

    fire() {
        this.myevent.next(['abc', 'def']);
    }
}