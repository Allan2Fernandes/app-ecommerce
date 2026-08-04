import { inject, Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductAPIService {
  httpClient = inject(HttpClient);

  getStoreFrontProducts(): Observable<Map<string, Product[]>> {
    return this.httpClient
      .get<Record<string, Product[]>>('products/store-front')
      .pipe(
        map((res) => new Map(Object.entries(res)))
      );
  }
}
