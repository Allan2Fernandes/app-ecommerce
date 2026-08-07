import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate-pipe';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found-component',
  imports: [TranslatePipe, RouterModule],
  templateUrl: './page-not-found-component.html',
})
export class PageNotFoundComponent {
  router = inject(Router)
}
