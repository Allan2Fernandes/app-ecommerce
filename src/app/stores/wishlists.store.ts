import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Wishlist } from "../models/Wishlist";
import { inject } from "@angular/core";
import { ToastService } from "../services/toast-service";
import { WishlistApiService } from "../services/wishlist-api-service";

type WishlistState = {
  wishlists: Wishlist[];
  loading: boolean;
};

const initialState: WishlistState = {
  wishlists: [],
  loading: false,
};

export const WishlistStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store) => {
        const toastService = inject(ToastService);
        const wishlistApiService = inject(WishlistApiService);
        return {
            getWishlists() {
                patchState(store, {loading: true});
                wishlistApiService.getWishlists().subscribe({
                    next: (res: Wishlist[]) => {
                      patchState(store, {wishlists: res, loading: false});
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
)