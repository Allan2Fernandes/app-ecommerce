import { Component, inject, input, output } from '@angular/core';
import { BaseModal } from "../base-modal/base-modal";
import { Button } from "../button/button";
import { TranslatePipe } from '../../../pipes/translate-pipe';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateWishlistModalData } from '../../../models/CreateWishlistModalData';
import { Wishlist } from '../../../models/Wishlist';
import { CreateWishlistData } from '../../../models/CreateWishlistData';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Helper } from '../../../services/helper';

@Component({
  selector: 'app-create-edit-wishlist-modal',
  imports: [BaseModal, Button, TranslatePipe, ReactiveFormsModule],
  templateUrl: './create-edit-wishlist-modal.html',
})
export class CreateEditWishlistModal {
  fb = inject(FormBuilder);
  closed = output<CreateWishlistData | undefined>();
  data = input.required<CreateWishlistModalData>();

  form = this.fb.group({
    title: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)]})
  });

  formInvalid = Helper.isFormValid(this.form);

  createWishlistClicked(): void {
    this.closed.emit({title: this.form.controls.title.value});
  }
}
