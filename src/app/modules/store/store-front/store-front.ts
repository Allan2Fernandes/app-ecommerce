import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavBar } from "../../shared/nav-bar/nav-bar";
import { ProductStore } from '../../../stores/products.store';
import { toObservable } from '@angular/core/rxjs-interop';
import { skip, Subscription } from 'rxjs';
import { JsonPipe, KeyValuePipe } from '@angular/common';
import { Carousel } from "../../shared/carousel/carousel";
import { categoryStore } from '../../../stores/categories.store';

@Component({
  selector: 'app-store-front',
  imports: [NavBar, KeyValuePipe, Carousel],
  templateUrl: './store-front.html',
})
export class StoreFront implements OnInit, OnDestroy {
  productStore = inject(ProductStore);
  categoriesStore = inject(categoryStore);

  productsInStore = this.productStore.storeFrontProducts;
  productsInStore$ = toObservable(this.productsInStore);

  categoriesInStore = this.categoriesStore.categoryMap;
  categoriesInStore$ = toObservable(this.categoriesInStore);

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.productStore.fetchStoreFrontProducts();
    this.categoriesStore.fetchCategories();
    this.subscriptions.push(
      this.productsInStore$.pipe(skip(1)).subscribe(x => console.log(x)),
      this.categoriesInStore$.pipe(skip(1)).subscribe(x => console.log(x)),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
