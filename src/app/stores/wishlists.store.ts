import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Wishlist } from "../models/Wishlist";
import { inject } from "@angular/core";
import { ToastService } from "../services/toast-service";
import { WishlistApiService } from "../services/wishlist-api-service";
import { CreateWishlistData } from "../models/CreateWishlistData";

type WishlistState = {
  wishlists: Wishlist[];
  wishlist: Wishlist | undefined;
  loading: boolean;
};

const initialState: WishlistState = {
  wishlists: [],
  wishlist: undefined,
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
            },
            deleteWishlist(id: string) {
              patchState(store, {loading: false});
              wishlistApiService.deleteWishlist(id).subscribe({
                next: () => {
                  patchState(store, {wishlists: store.wishlists().filter(wishlist => wishlist.id !== id),loading: false});
                  
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
            },
            createWishlist(data: CreateWishlistData) {
              patchState(store, {loading: true});
              wishlistApiService.createWishlist(data).subscribe({
                next: (res) => {
                  patchState(store, {wishlist: res, wishlists: [...store.wishlists(), res], loading: false})
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
            }
        }
    }),
)