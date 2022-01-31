import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Offer } from '../../models/offer.model';
import { OffersService } from '../../services/offers.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss'],
})
export class OffersListComponent implements OnInit {
  offers: Offer[] = [];
  hasPermissions!: boolean;

  constructor(
    private authService: AuthService,
    private offersService: OffersService
  ) {}

  ngOnInit(): void {
    this.hasPermissions = this.authService.hasPermissions('admin');

    this.offersService.getOffers$().subscribe({
      next: (response: Offer[]) => {
        this.offers = response;
      },
      error: (response: HttpErrorResponse) => {
        console.log(response);
      },
    });
  }

  onDelete(id: number): void {
    this.offersService.deleteOffer$(id).subscribe({
      next: () => {
        this.offers = this.offers.filter((offer) => offer.id !== id);
      },
    });
  }
}
