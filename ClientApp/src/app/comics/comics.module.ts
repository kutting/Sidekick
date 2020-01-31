///////////////////////////////////////////////////////////////////////////////////////
// Vendors Module
// Search, Create, Edit, Delete Vendors
///////////////////////////////////////////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIComponentsModule } from '../ui-components/ui-components.module';
import { ComicsSearchComponent } from './comics-search/comics-search.component';
import { ComicsAddComponent } from './comics-add/comics-add.component';
import { ComicsEditComponent } from './comics-edit/comics-edit.component';
import { ComicsViewComponent } from './comics-view/comics-view.component';



@NgModule({
	declarations: [ComicsSearchComponent, ComicsAddComponent, ComicsEditComponent, ComicsViewComponent],
	imports: [
		CommonModule,
		UIComponentsModule,
	]
})
export class ComicsModule { }
