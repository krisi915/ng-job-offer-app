import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Offer } from '../models/offer.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";


@Injectable({
providedIn: 'root'
})
export class OffersService {

    constructor(private http: HttpClient) {
        
    }
    
    getOffers$(): Observable<Offer[]> {

       return this.http.get<Offer[]>(environment.apiUrl + '/offers');
    }

    getOffer$(id: number): Observable<Offer> {
        return this.http.get<Offer>(`${environment.apiUrl}/offers/${id}`);
    }


    postOffer$(offer: Offer): Observable<Offer> {
        return this.http.post<Offer>(`${environment.apiUrl}/offers`, offer);
    }

    putOffer$(offer: Offer): Observable<Offer> {
        return this.http.put<Offer>(`${environment.apiUrl}/offers/${offer.id}`, offer);
    }
        
    deleteOffer$(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/offers/${id}`);
    }
}