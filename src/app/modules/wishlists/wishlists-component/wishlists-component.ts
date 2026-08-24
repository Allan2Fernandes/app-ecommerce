import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavBar } from "../../shared/nav-bar/nav-bar";
import { WishlistStore } from '../../../stores/wishlists.store';
import { BehaviorSubject, filter, Subscription } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Button } from "../../shared/button/button";
import { ICONS } from '../../../constants/icons';
import { AsyncPipe } from '@angular/common';
import { Helper } from '../../../services/helper';

@Component({
  selector: 'app-wishlists-component',
  imports: [NavBar, Button],
  templateUrl: './wishlists-component.html',
})
export class WishlistsComponent implements OnInit, OnDestroy{
  wishlistStore = inject(WishlistStore);
  Icons = ICONS;
  helper = Helper

  wishlists = this.wishlistStore.wishlists;
  wishlists$ = toObservable(this.wishlists);

  emptySpacesMap$ = new BehaviorSubject<Map<string, {emptySpacesList: number[]}> | null>(null);
  emptySpacesMap = toSignal(this.emptySpacesMap$);
  subscriptions: Subscription[] = [];

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
