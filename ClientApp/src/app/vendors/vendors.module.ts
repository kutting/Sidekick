///////////////////////////////////////////////////////////////////////////////////////
// Vendors Module
// Search, Create, Edit, Delete Vendors
///////////////////////////////////////////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIComponentsModule } from '../ui-components/ui-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';                   // Flexbox


// Import all the pages in the module
import { VendorsSearchComponent } from '../vendors/vendors-search/vendors-search.component';
import { VendorsAddComponent } from './vendors-add/vendors-add.component';
import { FormsComponent } from './forms/forms.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [VendorsSearchComponent, VendorsAddComponent, FormsComponent, AddComponent],
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
