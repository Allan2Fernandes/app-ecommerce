import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { Product } from '../models/Product';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast-service';
import { ProductAPIService } from '../services/product-api-service';

type ProductsState = {
  products: Product[];
  storeFrontProducts: Map<string, Product[]>;
  loading: boolean;
};

const initialState: ProductsState = {
  products: [],
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
                })
            }
        }
    })
)