import {Component, EventEmitter} from 'angular2/core'

@Component({
    selector: 'helper',
    templateUrl: 'app/helper.component.html',
    styleUrls: ['app/helper.component.css'],
    inputs: ['myname'],
    outputs: ['myevent']
})

export class HelperComponent {
    public myname: String;
    public myevent: EventEmitter<any> = new EventEmitter();

    fire() {
        this.myevent.next(['abc', 'def']);
    }
}