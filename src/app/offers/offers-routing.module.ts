import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { OffersComponent } from './components/offers/offers.component';
import { OfferFormComponent } from './components/offer-form/offer-form.component';
import { OffersListComponent } from './components/offers-list/offers-list.component';
import { AclGuard } from '../guards/acl.guard';

const routes: Route[] = [
  {
    path: '',
    component: OffersComponent,
    children: [
      {
        path: 'offers',
        component: OffersListComponent,
      },
      {
        path: 'offers/edit',
        component: OfferFormComponent,
        canActivate: [AclGuard],
      },
      {
        path: 'offers/edit/:id',
        component: OfferFormComponent,
        canActivate: [AclGuard],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'offers',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffersRoutingModule {}
