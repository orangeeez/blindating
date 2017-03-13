"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var login_component_1 = require("./components/router-outlet/login.component");
var dashboard_component_1 = require("./components/router-outlet/dashboard.component");
var talk_component_1 = require("./components/router-outlet/talk.component");
var appRoutes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'talk',
        component: talk_component_1.TalkComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
