import { Component, input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { TranslatePipe } from "../../../pipes/translate-pipe";
import { Product } from '../../../models/Product';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, Subscription } from 'rxjs';
import { Helper } from '../../../services/helper';

@Component({
  selector: 'app-carousel',
  imports: [TranslatePipe],
  templateUrl: './carousel.html',
})
export class Carousel implements OnInit, OnDestroy {
  title = input.required<string>();
  items = input.required<Product[]>();

  cardClickedEmitter = output<string>();

  stars = Array.from({ length: 5 }, (_, i) => i + 1);
  subscriptions: Subscription[] = []
  items$ = toObservable(this.items);
  reviewMap = new Map<string, {averagerating: number | null, formattedAverage: string, reviewCount: number}>();
  reviewMapSig = signal<Map<string, {averagerating: number | null, formattedAverage: string, reviewCount: number}> | null>(null);
  cardClicked(productid: string) {
    this.cardClickedEmitter.emit(productid);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.items$.pipe(filter(x => !Helper.isNullOrUndefined(x))).subscribe(items => {
        items.forEach(item => {
          this.reviewMap.set(item.id, {averagerating: this.averageRating(item), formattedAverage: this.formattedAverage(item), reviewCount: this.reviewCount(item)});
        });
        this.reviewMapSig.set(this.reviewMap);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  averageRating(product: Product): number | null {
    const reviews = product.reviews ?? [];
    if (reviews.length === 0) {
      return null;
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  }

  formattedAverage(product: Product): string {
    const average = this.averageRating(product);
    return average === null ? '' : average.toFixed(1);
  }

  reviewCount(product: Product): number {
    return product.reviews?.length ?? 0;
  }

  isStarFilled(star: number, average: number): boolean {
    return star <= Math.round(average);
  }
}
