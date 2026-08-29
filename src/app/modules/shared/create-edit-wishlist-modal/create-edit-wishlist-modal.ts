import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { BaseModal } from "../base-modal/base-modal";
import { Button } from "../button/button";
import { TranslatePipe } from '../../../pipes/translate-pipe';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateWishlistModalData } from '../../../models/CreateWishlistModalData';
import { Wishlist } from '../../../models/Wishlist';
import { WishlistData } from '../../../models/WishlistData';
import { Helper } from '../../../services/helper';
import { EditWishlistModalData } from '../../../models/EditWishlistModalData';

@Component({
  selector: 'app-create-edit-wishlist-modal',
  imports: [BaseModal, Button, TranslatePipe, ReactiveFormsModule],
  templateUrl: './create-edit-wishlist-modal.html',
})
export class CreateEditWishlistModal implements OnInit {
  fb = inject(FormBuilder);
  closed = output<WishlistData | undefined>();
  data = input.required<CreateWishlistModalData | EditWishlistModalData>();
  isEditModal = signal<boolean>(false);

  form = this.fb.group({
    title: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)]})
  });

  formInvalid = Helper.isFormValid(this.form);

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {
    const data = this.data();
    if(!this.isEditData(data)) {
      this.isEditModal.set(false);
      return;
    }
    this.isEditModal.set(true);
    this.form.controls.title.setValue(data.wishlist.title);
  }

  createWishlistClicked(): void {
    this.closed.emit({title: this.form.controls.title.value});
  }

  isEditData(data: CreateWishlistModalData | EditWishlistModalData): data is EditWishlistModalData {
    return 'wishlist' in data;
  }
}
