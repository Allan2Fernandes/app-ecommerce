import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryApiService {
  httpClient = inject(HttpClient);

  getCategories(): Observable<Map<string, Category>> {
    return this.httpClient
          .get<Record<string, Category>>('categories')
          .pipe(
            map((res) => new Map(Object.entries(res)))
          );
  }

}
