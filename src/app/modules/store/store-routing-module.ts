import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreFront } from './store-front/store-front';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'store-front',
    pathMatch: 'full'
  },
  {
    path: 'store-front',
    component: StoreFront
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
