import {
    Component,
    Host,
    Inject,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    forwardRef
}                        from '@angular/core';
import { Router }        from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { UserService }   from '../../services/user.service';
import { User }          from '../../models/user';
import { AppComponent }  from '../../components/app.component';
@Component({
    selector:    'dashboard-component',
    templateUrl: 'app/components/router-outlet/dashboard.component.html',
    styleUrls:  ['app/components/router-outlet/dashboard.component.css']
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
    public maxUsersRows:               number;
    public maxUsers:                   number;

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _userService: UserService,
        private _cookieService: CookieService,
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

        this._userService.GetAll()
            .subscribe(users => {
                this.app.users = users.filter(this.removeCurrentUser);
                this.isUsersLoaded = true;
            });
    }

    ngAfterViewInit() {
        this.profileBoardHeight = 110;
        this.profileStatsHeight = 105;
        this.profileStatsHeightExpanded = 75;
        this.dashboardWidth       = this.dashboard.nativeElement.clientWidth;
        this.dashboardHeight      = this.dashboard.nativeElement.clientHeight;
        this.dashboardStatsHeight = this.dashboardStats.nativeElement.clientHeight;
        this.maxUsersColumns      = this.dashboardWidth / Math.round((this.dashboardWidth * 8.3) / 100);
        this.maxUsersStatsColumns = this.dashboardWidth / Math.round((this.dashboardWidth * 25) / 100);
        this.maxUsersRows         = (this.dashboardHeight - (this.dashboardStatsHeight + this.profileStatsHeight)) / this.profileBoardHeight;
        this.maxUsers             = Math.floor(this.maxUsersColumns) * Math.floor(this.maxUsersRows);

        this._userService.GetNew(Math.round(this.maxUsersStatsColumns))
            .subscribe(users => {
                this.newUsers = users;//.filter(this.removeCurrentUser);
                this.isPopularUsersLoaded = true;
            });

        this._userService.GetActive(Math.round(this.maxUsersStatsColumns))
            .subscribe(users => {
                this.activeUsers = users;//.filter(this.removeCurrentUser);
                this.isActiveUsersLoaded = true;
            });

        this._userService.GetPopular(Math.round(this.maxUsersStatsColumns))
            .subscribe(users => {
                this.popularUsers = users;//.filter(this.removeCurrentUser);
                this.isNewUsersLoaded = true;
            });

        if (Math.floor(this.maxUsersRows) <= 0) this.maxUsers = 1;
        this._userService.GetRandom(this.maxUsers)
            .subscribe(users => {
                this.app.users = users;//.filter(this.removeCurrentUser);
                this.isUsersLoaded = true;
            });
    }

    public onExpandNew(): void {
        this.isNewExpanded = !this.isNewExpanded;

        if (this.isNewExpanded)
            this._userService.GetNew(Math.floor(this.maxUsersStatsColumns + this.getUsersCountForExpand()))
                .subscribe(users => {
                    this.newUsers = users;//.filter(this.removeCurrentUser);
                });

        if (!this.isNewExpanded)
            this._userService.GetNew(Math.round(this.maxUsersStatsColumns))
                .subscribe(users => {
                    this.newUsers = users;//.filter(this.removeCurrentUser);
                });
    }

    public onExpandActive(): void {
        this.isActiveExpanded = !this.isActiveExpanded;

        if (this.isActiveExpanded)
            this._userService.GetActive(Math.floor(this.maxUsersStatsColumns + this.getUsersCountForExpand()))
                .subscribe(users => {
                    this.activeUsers = users;//.filter(this.removeCurrentUser);
                });

        if (!this.isActiveExpanded)
            this._userService.GetActive(Math.round(this.maxUsersStatsColumns))
                .subscribe(users => {
                    this.activeUsers = users;//.filter(this.removeCurrentUser);
                });
    }

    public onExpandPopular(): void {
        this.isPopularExpanded = !this.isPopularExpanded;

        if (this.isPopularExpanded)
            this._userService.GetPopular(Math.floor(this.maxUsersStatsColumns + this.getUsersCountForExpand()))
                .subscribe(users => {
                    this.popularUsers = users;//.filter(this.removeCurrentUser);
                });

        if (!this.isPopularExpanded)
            this._userService.GetPopular(Math.round(this.maxUsersStatsColumns))
                .subscribe(users => {
                    this.popularUsers = users;//.filter(this.removeCurrentUser);
                });
    }

    public onRefreshUsers(): void {
        this._userService.GetRandom(this.maxUsers)
            .subscribe(users => { this.app.users = users; })
    }

    private removeCurrentUser = (user: User): boolean => {
        return user.id != this.app.user.id;
    }

    private getUsersCountForExpand(): number {
        return Math.floor((this.dashboardHeight - (Math.round(this.maxUsersStatsColumns) * this.profileStatsHeightExpanded)) / this.profileStatsHeightExpanded);
    }
}