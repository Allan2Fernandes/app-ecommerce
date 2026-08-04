import { Component, input } from '@angular/core';
import { TranslatePipe } from "../../../pipes/translate-pipe";
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-carousel',
  imports: [TranslatePipe],
  templateUrl: './carousel.html',
})
export class Carousel {
  title = input.required<string>();
  items = input.required<Product[]>();


}
