import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist } from '../models/Wishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistApiService {
  httpClient = inject(HttpClient);
  getWishlists(): Observable<Wishlist[]> {
    return this.httpClient.get<Wishlist[]>("wishlists");
  }
}
