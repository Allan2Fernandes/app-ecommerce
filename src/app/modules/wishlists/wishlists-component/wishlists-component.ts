import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NavBar } from "../../shared/nav-bar/nav-bar";
import { WishlistStore } from '../../../stores/wishlists.store';
import { BehaviorSubject, filter, Subscription, take } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Button } from "../../shared/button/button";
import { ICONS } from '../../../constants/icons';
import { Helper } from '../../../services/helper';
import { KebabMenu } from "../../shared/kebab-menu/kebab-menu";
import { MenuOption } from '../../../models/MenuOption';
import { PopupService } from '../../../services/popup-service';
import { DeleteConfirmationModal } from '../../shared/delete-confirmation-modal/delete-confirmation-modal';
import { DeleteConfirmationModalData } from '../../../models/DeleteConfirmationModalData';
import { TranslationService } from '../../../services/translation-service';
import { ɵInternalFormsSharedModule } from "@angular/forms";
import { CreateEditWishlistModal } from '../../shared/create-edit-wishlist-modal/create-edit-wishlist-modal';
import { CreateWishlistModalData } from '../../../models/CreateWishlistModalData';
import { Wishlist } from '../../../models/Wishlist';
import { CreateWishlistData } from '../../../models/CreateWishlistData';
import { TranslatePipe } from '../../../pipes/translate-pipe';

@Component({
  selector: 'app-wishlists-component',
  imports: [NavBar, Button, KebabMenu, ɵInternalFormsSharedModule, TranslatePipe],
  templateUrl: './wishlists-component.html',
})
export class WishlistsComponent implements OnInit, OnDestroy{
  wishlistStore = inject(WishlistStore);
  popupService = inject(PopupService);
  translationService = inject(TranslationService);

  Icons = ICONS;
  helper = Helper

  wishlists = this.wishlistStore.wishlists;
  wishlists$ = toObservable(this.wishlists);

  emptySpacesMap$ = new BehaviorSubject<Map<string, {emptySpacesList: number[]}> | null>(null);
  emptySpacesMap = toSignal(this.emptySpacesMap$);
  subscriptions: Subscription[] = [];

  menuOptions: MenuOption[] = [
    {
      id: '1',
      label: 'VIEW_WISHLIST',
    },
    {
      id: '2',
      label: 'DELETE_WISHLIST',
    },
    {
      id: '3',
      label: 'EDIT_WISHLIST',
    }
  ];



  optionClicked(menuOption: MenuOption, wishlist_id: string) {
    switch(menuOption.id) {
      case '1':
        this.handleViewWishlist(wishlist_id);
        break;
      case '2':
        this.handleDeleteWishlist(wishlist_id);
        break;
      case '3':
        this.handleEditWishlist(wishlist_id);
        break;
      default:
        // Throw error
        break;
    }
  }

  handleViewWishlist(id: string) {

  }

  handleEditWishlist(id: string) {

  }

  handleDeleteWishlist(id: string) {
    const subject = this.popupService.open<boolean, DeleteConfirmationModalData>(DeleteConfirmationModal, {title: this.translationService.translate('DELETE_WISHLIST'), body: this.translationService.translate('DELETE_WISHLIST_BODY')});
    subject.pipe(take(1)).subscribe(res => {
      if(!Helper.isNullOrUndefined(res) && res) {
        this.wishlistStore.deleteWishlist(id);
      }
    });
    
  }

  handleCreateWishlist() {
    const subject = this.popupService.open<CreateWishlistData | undefined, CreateWishlistModalData>(CreateEditWishlistModal, {title: this.translationService.translate('CREATE_WISHLIST'), body: this.translationService.translate('CREATE_WISHLIST_BODY')});
    subject.pipe(take(1)).subscribe(res => {
      if(!Helper.isNullOrUndefined(res)) {
        this.wishlistStore.createWishlist(res);
      }
    });
     
  }

  ngOnInit(): void {
    this.wishlistStore.getWishlists();
    this.subscriptions.push(
      this.wishlists$.pipe(filter(wishlists => !Helper.isNullOrUndefined(wishlists))).subscribe(wishlists => {
        const map = new Map<string, {emptySpacesList: number[]}>();
        wishlists.forEach(wishlist => {
          map.set(wishlist.id, {emptySpacesList: wishlist.products.length >= 4 ? [] : this.range(4 - wishlist.products.length)});
        });

        this.emptySpacesMap$.next(map);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  range(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i);
}
}
