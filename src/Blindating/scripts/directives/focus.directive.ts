import {
    Component,
    OnInit,
    EventEmitter,
    OnDestroy,
    Directive,
    ElementRef
}                   from '@angular/core';
@Directive({ selector: '[focus-directive]' })
export class FocusDirective implements OnInit, OnDestroy {
    public element: HTMLElement;
    constructor(element: ElementRef) {
        this.element = element.nativeElement;
    }

    ngOnInit() { this.element.focus(); }

    ngOnDestroy() { }
}