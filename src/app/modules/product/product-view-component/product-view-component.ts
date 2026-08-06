import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NavBar } from "../../shared/nav-bar/nav-bar";
import { filter, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Helper } from '../../../services/helper';
import { toObservable } from '@angular/core/rxjs-interop';
import { ProductStore } from '../../../stores/products.store';
import { BreadCrumb } from "../../shared/bread-crumb/bread-crumb";
import { GalleryComponent } from "../../shared/gallery-component/gallery-component";

@Component({
  selector: 'app-product-view-component',
  imports: [NavBar, BreadCrumb, GalleryComponent],
  templateUrl: './product-view-component.html',
})
export class ProductViewComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  productStore = inject(ProductStore);

  productId = signal<string>('');
  productId$ = toObservable(this.productId);
  
  product = this.productStore.product;
  product$ = toObservable(this.product);

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const productid = params.get('id');
        if(Helper.isNullOrUndefined(productid)) {
          return;
        }
        this.productId.set(productid)
      }),
      this.productId$.pipe(filter(id => !Helper.isEmptyString(id) && !Helper.isNullOrUndefined(id))).subscribe(id => {
        this.productStore.fetchProduct(id);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
