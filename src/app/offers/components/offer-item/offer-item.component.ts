import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Offer } from '../../models/offer.model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {
  @Input() offer!: Offer;

  @Output() deleteClicked = new EventEmitter<number>();

  hasPermissions!: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.hasPermissions = this.authService.hasPermissions('admin');
  }

  onDelete(): void {
    this.deleteClicked.emit(this.offer.id);
  }
}
