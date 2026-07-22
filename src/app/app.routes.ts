import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './modules/shared/page-not-found-component/page-not-found-component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'authorization',
        pathMatch: 'full'
    },
    {
        path: 'authorization',
        loadChildren: () => import('./modules/authorization/authorization-module').then(m => m.AuthorizationModule),
    },
    {
        path: 'store',
        loadChildren: () => import('./modules/store/store-module').then(m => m.StoreModule),
    },
    {
        path: 'not-found',
        component: PageNotFoundComponent
    },
    {
        path: '**',
        redirectTo: 'not-found'
    },
];
