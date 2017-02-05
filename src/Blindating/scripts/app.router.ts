import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent }       from './components/router-outlet/login.component';
import { DashboardComponent }   from './components/router-outlet/dashboard.component';
import { TalkComponent }        from './components/router-outlet/talk.component';
const appRoutes: Routes = [
    {
        path:       '',
        redirectTo: '/talk',
        pathMatch:  'full'
    },
    {
        path:      'login',
        component: LoginComponent
    },
    {
        path:      'dashboard',
        component: DashboardComponent
    },
    {
        path:      'talk',
        component: TalkComponent
    }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);