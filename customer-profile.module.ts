import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerProfileComponent } from './customer-profile.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CustomerProfileComponent],
  exports: [
    CustomerProfileComponent
  ]
})
export class CustomerProfileModule { }
