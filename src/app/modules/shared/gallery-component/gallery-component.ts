import { Component, computed, input, output, signal } from '@angular/core';
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

  selectedImage = computed(() => this.images()[this.selectedIndex()]);

  nextClicked() {
    this.selectedIndex.update(index => (index + 1) % this.images().length);
  }

  previousClicked() {
    this.selectedIndex.update(index => {
      const newIndex = index - 1;
      if (newIndex  < 0) {
        return this.images().length - 1;
      } 
      return newIndex;
    });
  }
}
