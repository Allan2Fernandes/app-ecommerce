import { Component, input } from '@angular/core';
import { Category } from '../../../models/Category';
import { Helper } from '../../../services/helper';

@Component({
  selector: 'app-bread-crumb',
  imports: [],
  templateUrl: './bread-crumb.html',
})
export class BreadCrumb {
  category = input<Category>();
  

  helper = Helper;
}
