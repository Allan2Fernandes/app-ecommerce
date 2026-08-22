import { Component, input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { TranslatePipe } from "../../../pipes/translate-pipe";
import { Product } from '../../../models/Product';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, Subscription } from 'rxjs';
import { Helper } from '../../../services/helper';
import { RatingsComponent } from "../ratings-component/ratings-component";

@Component({
  selector: 'app-carousel',
  imports: [TranslatePipe, RatingsComponent],
  templateUrl: './carousel.html',
})
export class Carousel {
  title = input.required<string>();
  items = input.required<Product[]>();

  cardClickedEmitter = output<string>();

  cardClicked(productid: string) {
    this.cardClickedEmitter.emit(productid);
  }
}
