import {DashboardUtils} from './../utils/dashboard.utils'
import {dTrack} from './track'
import {dSentence} from './sentence'
import {dVideo} from './video'

export class dDashboard {
    private Dashboard: HTMLElement;

    private NavbarTopPadding = document.getElementById('navbar-top').clientHeight;
    private LeftColumnPadding = document.getElementById('left-column').clientWidth;

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
    private AddSentence = (event: MouseEvent): EventListener => {
        let actualSentenceWidth = event.x - this.LeftColumnPadding;
        let actualSentenceHeight = event.y - this.NavbarTopPadding;

        let target = event.srcElement.className;

        if (!this.IsMouseLocationAllowed(target))
            return;

        // Set block height propertie to max without leaving a height boundary
        if (actualSentenceHeight + DashboardUtils.INITIAL_TEXTAREA_HEIGHT > this.Dashboard.clientHeight)
            actualSentenceHeight = this.Dashboard.clientHeight - DashboardUtils.INITIAL_TEXTAREA_HEIGHT - 1;

        let sentence: dSentence = new dSentence(this.Dashboard, actualSentenceWidth, actualSentenceHeight);
        this.Sentences.push(sentence);
        return;
    }
    private AddTrack = (event: MouseEvent): EventListener => {
        return;
    }
    private AddVideo = (event: MouseEvent): EventListener => {
        return;
    }

    // Don't allow to create a sentence in the area where element already exist
    private IsMouseLocationAllowed(target: string): boolean {
        if (target == 'textbox' || target == 'textarea')
            return false;
        else
            return true;
    }
}
