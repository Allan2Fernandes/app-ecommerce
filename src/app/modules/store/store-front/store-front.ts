import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavBar } from "../../shared/nav-bar/nav-bar";
import { ProductStore } from '../../../stores/products.store';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { KeyValuePipe } from '@angular/common';
import { Carousel } from "../../shared/carousel/carousel";
import { categoryStore } from '../../../stores/categories.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-front',
  imports: [NavBar, KeyValuePipe, Carousel],
  templateUrl: './store-front.html',
})
export class StoreFront implements OnInit {
  productStore = inject(ProductStore);
  categoriesStore = inject(categoryStore);
  router = inject(Router);

  numProductsPerCategory = 3;

  productsInStore = this.productStore.storeFrontProducts;
  productsInStore$ = toObservable(this.productsInStore);

  categoriesInStore = this.categoriesStore.categoryMap;
  categoriesInStore$ = toObservable(this.categoriesInStore);


  ngOnInit(): void {
    this.productStore.fetchStoreFrontProducts(this.numProductsPerCategory);
    this.categoriesStore.fetchCategories();
  }

  routeToProductPage(productId: string) {
    this.router.navigate([`product/${productId}`]);
  }
}
