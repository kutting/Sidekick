///////////////////////////////////////////////////////////////////////////////////////
// Vendors Module
// Search, Create, Edit, Delete Vendors
///////////////////////////////////////////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIComponentsModule } from '../ui-components/ui-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';                   // Flexbox
import { PhonePipe } from '../ui-components/pipe-phone/pipe-phone.pipe';


// Import all the pages in the module
import { VendorsSearchComponent } from '../vendors/vendors-search/vendors-search.component';
import { VendorsAddComponent } from './vendors-add/vendors-add.component';
import { VendorsEditComponent } from './vendors-edit/vendors-edit.component';
import { VendorsViewComponent } from './vendors-view/vendors-view.component';

@NgModule({
  declarations: [VendorsSearchComponent, VendorsAddComponent, PhonePipe, VendorsEditComponent, VendorsViewComponent],
  imports: [
	  CommonModule,
	  UIComponentsModule,
	  FormsModule,
	  ReactiveFormsModule,
	  FlexLayoutModule,
	],
	exports: [
		VendorsSearchComponent
	]
})
export class VendorsModule { }
