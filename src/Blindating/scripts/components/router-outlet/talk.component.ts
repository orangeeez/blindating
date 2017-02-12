import {
    Component,
    Host,
    Inject,
    OnInit,
    OnDestroy,
    NgZone,
    forwardRef,
    ElementRef,
    ViewChild,
    AnimationTransitionEvent,
    trigger,
    state,
    style,
    transition,
    animate
}                       from '@angular/core';
import { Router }       from '@angular/router';
import { UserService }  from '../../services/user.service';
import { User }         from '../../models/user';
import { Message }      from '../../models/message';
import { AppComponent } from '../../components/app.component';
@Component({
    selector: 'talk-component',
    templateUrl: 'app/components/router-outlet/talk.component.html',
    styleUrls: ['app/components/router-outlet/talk.component.css'],
    animations: [
        trigger('dialogState', [
            state('hidden', style({
                width: '0px'
            })),
            state('shown', style({
                width: '33.3%'
            })),
            transition('hidden => shown', animate('100ms ease-in')),
            transition('shown => hidden', animate('100ms ease-out'))
        ])
    ]
})
export class TalkComponent implements OnInit, OnDestroy {
    @ViewChild('dialogBody')    private dialogBody: ElementRef;
    @ViewChild('videoRemote')   private videoRemote: ElementRef;
    @ViewChild('expandIcon')    private expandIcon: ElementRef; 
    @ViewChild('minimizeVideo') private minimizeVideo: ElementRef;
    @ViewChild('maximizeVideo') private maximizeVideo: ElementRef;

    public isSmileActive: boolean = false;                                                 
    
    public app: AppComponent;
    public isExpandedVideo: boolean;
    public dialogState: string = 'shown';
    public messages: Message[] = [
        new Message(
            12, "message-you", "Привет, как твои дела. Давно не виделись. Не хотел бы встретиться, а то я уже соскучился"
        ),
        new Message(
            12, "message-you", "Как ты"
        ),
        new Message(
            12, "message-me", "Привет, рад тебя слышать"
        ),
        new Message(
            12, "message-me", "Конечно давай увидимся"
        )
    ];

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _userService: UserService,
        private _router:      Router,
        private _zone:        NgZone) {
        this.app = app;
    }
    public ngOnInit() {
        this.app._talk = this;
        this.app._header.DeselectMenus();
        this.app._header.isTalkActive = true;
    }
    public ngOnDestroy() {
        this.isSmileActive = false;
    }
    public onSendMessage(textareaMessage: HTMLTextAreaElement): void {
        var message = new Message(+ Date.now, 'message-me', textareaMessage.value);
        this.messages.push(message);
        this.app.user.peer.send(JSON.stringify(message), this.app.communicationUser.jwt);
        textareaMessage.value = '';
    }
    public onEnterSendMessage(event: KeyboardEvent, textareaMessage: HTMLTextAreaElement): boolean {
        if (event.keyCode == 13) {
            this.onSendMessage(textareaMessage);
            return false;
        }
    }
    public onExpandNarrowVideo(): void {
        if (!this.isExpandedVideo) {
            this.videoRemote.nativeElement.style.height = '100%';
            this.videoRemote.nativeElement.style.border = 'none';
            this.videoRemote.nativeElement.style.right  = '0px';
            this.videoRemote.nativeElement.style.bottom = '0px';
            if (this.dialogState == 'shown') {
                this.videoRemote.nativeElement.style.width = '66.6%';
            }
            else {
                this.videoRemote.nativeElement.style.width = '100%';
                this.expandIcon.nativeElement.style.left   = '35px';
                this.minimizeVideo.nativeElement.style.left = '50px';                    
            }
        }
        else {
            this.videoRemote.nativeElement.style.height = '225px';
            this.videoRemote.nativeElement.style.width  = '300px';            
            this.videoRemote.nativeElement.style.border = '1px solid var(--main-border-color)';
            this.videoRemote.nativeElement.style.right  = '5px';
            this.videoRemote.nativeElement.style.bottom = '5px';
            if (this.dialogState == 'shown')
                this.videoRemote.nativeElement.style.width = '300px';
            else {
                this.videoRemote.nativeElement.style.width = '300px';
                this.expandIcon.nativeElement.style.left   = '5px';  
                this.minimizeVideo.nativeElement.style.left = '20px';                                      
            }
        }
        
        this.isExpandedVideo = !this.isExpandedVideo;        
    }
    public onMinimizeVideo(): void {
        this.videoRemote.nativeElement.hidden = true;
        this.maximizeVideo.nativeElement.style.visibility = 'visible';
    }
    public onMaximizeVideo(): void {
        this.videoRemote.nativeElement.hidden = false;
        this.maximizeVideo.nativeElement.style.visibility = 'hidden';
    }
    public onSmileClick(): void {
        this.isSmileActive = !this.isSmileActive;
    }
    private dialogToggle(): void {
        this.dialogState = (this.dialogState == 'hidden') ? this.dialogState = 'shown' : this.dialogState = 'hidden';
    }
    public dialogToggleDone(event: AnimationTransitionEvent, dialog: HTMLDivElement, arrowShow: HTMLDivElement): void {
                                                                                
        if (event.fromState == 'void')
            return;

        if (this.dialogState == 'shown') {
            this._zone.run(() => this.isSmileActive = false);
            dialog.hidden = false;
            arrowShow.hidden = true;

            if (this.isExpandedVideo) {
                this.videoRemote.nativeElement.style.width = '66.6%';            
                this.expandIcon.nativeElement.style.left   = '5px';  
                this.minimizeVideo.nativeElement.style.left = '20px';                                                                        
            }
        }
        else {
            dialog.hidden = true;
            arrowShow.hidden = false;

            if (this.isExpandedVideo) {
                this.videoRemote.nativeElement.style.width = '100%';     
                this.expandIcon.nativeElement.style.left   = '35px';  
                this.minimizeVideo.nativeElement.style.left = '50px';
            }
        }
    }
}
