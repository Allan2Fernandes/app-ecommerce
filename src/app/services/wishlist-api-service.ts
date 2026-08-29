import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist } from '../models/Wishlist';
import { WishlistData } from '../models/WishlistData';

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

  createWishlist(data: WishlistData): Observable<Wishlist> {
    return this.httpClient.post<Wishlist>('wishlists', {title: data.title});
  }

  editWishlist(id: string, data: WishlistData): Observable<Wishlist> {
    return this.httpClient.patch<Wishlist>(`wishlists/${id}`, {title: data.title});
  }
}
