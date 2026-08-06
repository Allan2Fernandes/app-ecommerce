import { inject, Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Helper } from './helper';

@Injectable({
  providedIn: 'root',
})
export class ProductAPIService {
  httpClient = inject(HttpClient);

  getStoreFrontProducts(limit?: number): Observable<Map<string, Product[]>> {
    let params = new HttpParams();

    if(!Helper.isNullOrUndefined(limit)) {
      params = params.set('limit', limit.toString());
    }
    
    return this.httpClient
      .get<Record<string, Product[]>>('products/store-front', {params})
      .pipe(
        map((res) => new Map(Object.entries(res)))
      );
  }

  getProduct(productId: string): Observable<Product> {
    return this.httpClient.get<Product>(`products/${productId}`);
  } 
}
