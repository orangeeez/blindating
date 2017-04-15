import {
    Component,
    Host,
    Inject,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    AnimationTransitionEvent,
    forwardRef,
    trigger,
    state,
    style,
    transition,
    animate
}                              from '@angular/core';
import { Router }              from '@angular/router';
import { CookieService }       from 'angular2-cookie/core';
import { UserService }         from '../../services/user.service';
import { NotificationService } from '../../services/information/notification.service';
import { User }                from '../../models/user';
import { AppComponent }        from '../../components/app.component';
@Component({
    selector:    'dashboard-component',
    templateUrl: 'app/components/router-outlet/dashboard.component.html',
    styleUrls:  ['app/components/router-outlet/dashboard.component.css'],
        animations: [
        trigger('pickupState', [
            state('deselected', style({
                height: '0px',
                'padding-top': '0px',
            })),
            state('selected', style({
                height: '160px',
                'padding-top': '10px'
            })),
            transition('deselected => selected', animate('300ms ease-in')),
            transition('selected => deselected', animate('300ms ease-out'))
        ])
    ]
})
export class DashboardComponent implements OnInit, AfterViewInit {
    @ViewChild('dashboard') dashboard: ElementRef;
    @ViewChild('dashboardStats') dashboardStats: ElementRef;

    public app: AppComponent;
    public newUsers:     User[];
    public popularUsers: User[];
    public activeUsers:  User[];
    public searchUsers:  User[];
    public activities:   any[];
    public pickupState:  string = 'deselected';
    public pickupUser:   User;

    public isActiveExpanded:  boolean = false;
    public isNewExpanded:     boolean = false;
    public isPopularExpanded: boolean = false;

    public isUsersLoaded:        boolean = false;
    public isNewUsersLoaded:     boolean = false;
    public isPopularUsersLoaded: boolean = false;
    public isActiveUsersLoaded:  boolean = false;

    public isSearchShow: boolean = false;

    public profileStatsHeightExpanded: number;
    public profileBoardHeight:         number;
    public profileStatsHeight:         number;
    public dashboardWidth:             number;
    public dashboardHeight:            number;
    public dashboardStatsHeight:       number;
    public maxUsersColumns:            number;
    public maxUsersStatsColumns:       number;
    public maxUsers:                   number;

    public searchToggles: Array<any> = [
        { title: 'Gender', items: ['Male', 'Female', 'Anyway']  },
        { title: 'Hair', items:   ['Male', 'Female', 'Anyway']  },
        { title: 'Eyes', items:   ['Male', 'Female', 'Anyway']  },
        { title: 'Color', items:  ['Male', 'Female', 'Anyway']  },
    ];

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _userService: UserService,
        private _cookieService: CookieService,
        private _notificationService: NotificationService,
        private _router: Router) {

        this.app = app;
        var id = this.app.user.id;
        window.onbeforeunload = function (e) {
            _userService.Logout(id).subscribe();
        };
    }

    ngOnInit() {
        this.app._dashboard = this;
        this.app._header.DeselectMenus();
        this.app._header.isDashboardActive = true;
        if (this.app.isPickupShow) this.pickupToggle();

        this.pickupUser = new User();

        this.pickupUser.id = 2;
        this.pickupUser.firstname = "Viktor";
        this.pickupUser.lastname = "Orkush";
        this.pickupUser.email = "v.orkush@gmail.com";
        this.pickupUser.image = 'images/users/3hqzwa25.agr.jpg';
        this.pickupUser.online = true;
        this.pickupUser.jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InYub3JrdXNoQGdtYWlsLmNvbSIsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.flhwvv4VCsaKp0grVAbB2RBGJkutHle2CgvvgdoTkDo';
    }

    ngAfterViewInit() {
        this.profileBoardHeight = 110;
        this.profileStatsHeight = 105;
        this.profileStatsHeightExpanded = 75;
        this.dashboardWidth = this.dashboard.nativeElement.clientWidth;
        this.dashboardHeight = this.dashboard.nativeElement.clientHeight;
        this.dashboardStatsHeight = this.dashboardStats.nativeElement.clientHeight;
        this.maxUsersColumns = this.dashboardWidth / Math.round((this.dashboardWidth * 8.3) / 100);
        this.maxUsersStatsColumns = this.dashboardWidth / Math.round((this.dashboardWidth * 25) / 100);
        this.maxUsers = Math.floor(this.maxUsersColumns) * 4;

        this._userService.GetAll()
            .subscribe(users => {
                this.app.users = users.filter(this.removeCurrentUser);
                this.isUsersLoaded = true;
            });

        this._userService.GetNew(Math.round(this.maxUsersStatsColumns))
            .subscribe(users => {
                this.newUsers = users;
                this.isPopularUsersLoaded = true;
            });

        this._userService.GetActive(Math.round(this.maxUsersStatsColumns))
            .subscribe(users => {
                this.activeUsers = users;
                this.isActiveUsersLoaded = true;
            });

        this._userService.GetPopular(Math.round(this.maxUsersStatsColumns))
            .subscribe(users => {
                this.popularUsers = users;
                this.isNewUsersLoaded = true;
            });

        // if (Math.round(this.maxUsersRows) <= 0) this.maxUsers = 1;
        this._userService.GetRandom(this.maxUsers)
            .subscribe(users => {
                this.app.users = users.filter(this.removeCurrentUser);
                this.isUsersLoaded = true;
            });

        this._notificationService.GetCount(this.app.user.id)
            .subscribe(notificaitionCount => {
                if (notificaitionCount > 99)
                    notificaitionCount = 99;

                this.app._header.notificationCount = notificaitionCount;
            });
    }

    public pickupToggle() {
        this.pickupState = (this.pickupState === 'selected' ? 'deselected' : 'selected');
    }

    public onExpandNew(): void {
        this.isNewExpanded = !this.isNewExpanded;

        if (this.isNewExpanded)
            this._userService.GetNew(Math.floor(this.maxUsersStatsColumns + this.getUsersCountForExpand()))
                .subscribe(users => {
                    this.newUsers = users;
                });

        if (!this.isNewExpanded)
            this._userService.GetNew(Math.round(this.maxUsersStatsColumns))
                .subscribe(users => {
                    this.newUsers = users;
                });
    }

    public onExpandActive(): void {
        this.isActiveExpanded = !this.isActiveExpanded;

        if (this.isActiveExpanded)
            this._userService.GetActive(Math.floor(this.maxUsersStatsColumns + this.getUsersCountForExpand()))
                .subscribe(users => {
                    this.activeUsers = users;
                });

        if (!this.isActiveExpanded)
            this._userService.GetActive(Math.round(this.maxUsersStatsColumns))
                .subscribe(users => {
                    this.activeUsers = users;
                });
    }

    public onExpandPopular(): void {
        this.isPopularExpanded = !this.isPopularExpanded;

        if (this.isPopularExpanded)
            this._userService.GetPopular(Math.floor(this.maxUsersStatsColumns + this.getUsersCountForExpand()))
                .subscribe(users => {
                    this.popularUsers = users;
                });

        if (!this.isPopularExpanded)
            this._userService.GetPopular(Math.round(this.maxUsersStatsColumns))
                .subscribe(users => {
                    this.popularUsers = users;
                });
    }

    public onRefreshUsers(): void {
        this._userService.GetRandom(this.maxUsers)
            .subscribe(users => {
                this.app.users = users.filter(this.removeCurrentUser);
            })
    }

    public onPickupDone(event: AnimationTransitionEvent): void { }

    public onPickupInvite(): void {
        this.app.selectDeselectUser(this.pickupUser);
        this.app.isSelectedUserYou();
        this.app.isPickupShow = false;
        this.app._helper.onInviteAcceptCall();
        this.pickupToggle();
    }

    public onPickupDecline(): void {
        this.app.isPickupShow = false;
        this.pickupToggle();
        this.app.isHeaderShow = true;
        this.app.selectedUser = null;
    }

    private removeCurrentUser = (user: User): boolean => {
        return user.id != this.app.user.id;
    }

    private getUsersCountForExpand(): number {
        return Math.floor((this.dashboardHeight - (Math.round(this.maxUsersStatsColumns) * this.profileStatsHeightExpanded)) / this.profileStatsHeightExpanded);
    }
}