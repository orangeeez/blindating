import {Component, EventEmitter} from 'angular2/core'

@Component({
    selector: 'foot',
    templateUrl: 'app/footer.component.html',
    styleUrls: ['app/footer.component.css'],
    inputs: ['myname'],
    outputs: ['myevent']
})

export class FooterComponent {
    public myname: String;
    public myevent: EventEmitter<any> = new EventEmitter();

    fire() {
        this.myevent.next(['abc', 'def']);
    }
}