import { Component, computed, input, signal } from '@angular/core';
import { Image } from '../../../models/Image';
import { Helper } from '../../../services/helper';

@Component({
  selector: 'app-gallery-component',
  imports: [],
  templateUrl: './gallery-component.html',
})
export class GalleryComponent {
  images = input.required<Image[]>();
  name = input.required<string>();
  selectedIndex = signal<number>(0);
  helper = Helper;

  selectedImage = computed(() => this.images()[this.selectedIndex()])
}
