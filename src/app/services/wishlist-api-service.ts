import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist } from '../models/Wishlist';
import { CreateWishlistData } from '../models/CreateWishlistData';

@Injectable({
  providedIn: 'root',
})
export class WishlistApiService {
  httpClient = inject(HttpClient);

  getWishlists(): Observable<Wishlist[]> {
    return this.httpClient.get<Wishlist[]>("wishlists");
  }

  deleteWishlist(id: string): Observable<void> {
    return this.httpClient.delete<void>(`wishlists/${id}`);
  }

  createWishlist(data: CreateWishlistData): Observable<Wishlist> {
    return this.httpClient.post<Wishlist>('wishlists', {title: data.title});
  }
}
