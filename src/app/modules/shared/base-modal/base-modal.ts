import { Component, output } from '@angular/core';

@Component({
  selector: 'app-base-modal',
  imports: [],
  templateUrl: './base-modal.html',
})
export class BaseModal {
  closed = output();
}
