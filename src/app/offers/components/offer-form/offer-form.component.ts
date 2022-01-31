import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { Offer } from '../../models/offer.model';
import { OffersService } from '../../services/offers.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent implements OnInit, OnDestroy {

  formGroup: FormGroup = this.fb.group({});

  destroy$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private offersService: OffersService
  ) {
   }

  ngOnInit(): void { 
    this.buildForm();

    this.route.params.pipe(
      switchMap( (params : Params) => {
        const id = params['id'];

        if (id) {
          return this.offersService.getOffer$(id);
        }
        
        return of(null);
          }),
      takeUntil(this.destroy$)
    ).subscribe( {
      next: (response: Offer | null) => {
      response && this.buildForm(response);
      }
    });  
  }

ngOnDestroy(): void {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    const offer = this.formGroup.value as Offer;
    let request$;
      
      if (!offer.id) {
      request$ = this.offersService.postOffer$(offer);
    } else {
      request$ = this.offersService.putOffer$(offer);
    }
  

    request$.subscribe({
      next: () => {
        this.router.navigate(['/offers']);
      }
    });

  }

  private buildForm(offer?: Offer): void {
    this.formGroup = this.fb.group({
      id: offer?.id,
      title: [offer?.title || ''],
      description: [offer?.description || ''],
      typeofoffer: [offer?.typeofoffer || '', [Validators.required]],
      category: [offer?.category || '', [Validators.required]]
    });
  }
}
