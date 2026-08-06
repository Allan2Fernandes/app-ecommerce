import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { Product } from '../models/Product';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast-service';
import { ProductAPIService } from '../services/product-api-service';

type ProductsState = {
  products: Product[];
  product: Product | undefined;
  storeFrontProducts: Map<string, Product[]>;
  loading: boolean;
};

const initialState: ProductsState = {
  products: [],
  product: undefined,
  storeFrontProducts: new Map(),
  loading: false,
};

export const ProductStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store) => {
        const productAPIService = inject(ProductAPIService);
        const toastService = inject(ToastService);
        return {
            fetchStoreFrontProducts() {
                patchState(store, {loading: true});
                productAPIService.getStoreFrontProducts().subscribe({
                    next: (res: Map<string, Product[]>) => {
                      patchState(store, {storeFrontProducts: res, loading: false});
                    },
                    error: (err) => {
                        patchState(store, {loading: false});
                        toastService.add({
                          id: crypto.randomUUID(),
                          type: 'error',
                          message: err.error.message
                        });
                      }
                });
            },
            fetchProduct(productid: string) {
                patchState(store, {loading: true});
                productAPIService.getProduct(productid).subscribe({
                  next: (res: Product) => {
                      patchState(store, {product: res, loading: false});
                    },
                    error: (err) => {
                        patchState(store, {loading: false});
                        toastService.add({
                          id: crypto.randomUUID(),
                          type: 'error',
                          message: err.error.message
                        });
                      }
                });
            },
        }
    })
)