import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { OfferFormComponent } from './components/offer-form/offer-form.component';
import { OfferItemComponent } from './components/offer-item/offer-item.component';
import { OffersListComponent } from './components/offers-list/offers-list.component';
import { OffersComponent } from './components/offers/offers.component';
import { OffersRoutingModule } from './offers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    OffersRoutingModule
  ],
  declarations: [
    OffersListComponent,
    OfferItemComponent,
    OfferFormComponent,
    OffersComponent
  ],
})
export class OffersModule {
  
}
