import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Category } from "../models/Category";
import { CategoryApiService } from "../services/category-api-service";
import { ToastService } from "../services/toast-service";
import { inject } from "@angular/core";

type CategoriesState = {
  categoryMap: Map<string, Category>;
  loading: boolean;
};

const initialState: CategoriesState = {
  categoryMap: new Map(),
  loading: false,
};



export const categoryStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store) => {
        const categoryAPIService = inject(CategoryApiService);
        const toastService = inject(ToastService);
        return {
            fetchCategories() {
                patchState(store, {loading: true});
                categoryAPIService.getCategories().subscribe({
                    next: (res: Map<string, Category>) => {
                      patchState(store, {categoryMap: res, loading: false});
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
    }),
);