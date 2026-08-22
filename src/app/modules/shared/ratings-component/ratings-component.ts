import { Component, computed, input, OnDestroy, OnInit } from '@angular/core';
import { Review } from '../../../models/Review';
import { BehaviorSubject, filter, Subscription } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Helper } from '../../../services/helper';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-ratings-component',
  imports: [AsyncPipe],
  templateUrl: './ratings-component.html',
})
export class RatingsComponent implements OnInit, OnDestroy  {
  reviews = input.required<Review[]>();
  reviews$ = toObservable(this.reviews);

  averageRating$ = new BehaviorSubject<number | null>(null);
  formattedAverage$ = new BehaviorSubject<string | null>(null);

  stars = Array.from({ length: 5 }, (_, i) => i + 1);
  subscriptions: Subscription[] = []

  averageRating(reviews: Review[]): number | null {
    if (reviews.length === 0) {
      return null;
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  }

  formattedAverage(reviews: Review[]): string {
    const average = this.averageRating(reviews);
    return average === null ? '' : average.toFixed(1);
  }


  isStarFilled(star: number, average: number): boolean {
    return star <= Math.round(average);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.reviews$.pipe(filter(rev => !Helper.isNullOrUndefined(rev))).subscribe(reviews => {
        this.formattedAverage$.next(this.formattedAverage(reviews));
        this.averageRating$.next(this.averageRating(reviews));
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
