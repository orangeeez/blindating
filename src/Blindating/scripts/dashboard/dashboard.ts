import {dTrack} from './track'
import {dSentence} from './sentence'
import {dVideo} from './video'

export class dDashboard {
    public Dashboard: HTMLElement;

    public Tracks: dTrack[];
    public Sentences: dSentence[];
    public Videos: dVideo[];
    constructor() {
        this.Tracks = [];
        this.Sentences = [];
        this.Videos = [];

        this.Dashboard = document.getElementById('dashboard');
        this.Dashboard.addEventListener('click', this.AddSentence);
    }
    public AddSentence = (event: MouseEvent): EventListener => {
        let sentence: dSentence = new dSentence(this.Dashboard, event.x, event.y);
        this.Sentences.push(sentence);
        return;
    }
}
