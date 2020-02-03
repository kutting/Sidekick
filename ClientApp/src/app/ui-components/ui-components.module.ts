///////////////////////////////////////////////////////////////////////////////////////
// Material Module
// Import all Material Modules needed by app
///////////////////////////////////////////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
	MatAutocompleteModule,
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatDialogModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatNativeDateModule,
	MatOptionModule,
	MatProgressBarModule,
	MatRadioModule,
	MatSelectModule,
	MatSidenavModule,
	MatSortModule,
	MatTableModule,
	MatToolbarModule,
} from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Immaterial Components
import { SliderComponent } from './slider.component';
import { ButtonWithIconComponent } from './button-with-icon/button-with-icon.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { GridPageBarComponent } from './grid-page-bar/grid-page-bar.component';
import { FloorPipe } from '../ui-components/pipes/floor.pipe';

@NgModule({
	declarations: [
		SliderComponent,
		ButtonWithIconComponent,
		NavMenuComponent,
		TitlebarComponent,
		GridPageBarComponent,
		FloorPipe,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatIconModule,
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatOptionModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatRadioModule,
		MatSidenavModule,
		MatSortModule,
		MatToolbarModule,
		MatTableModule,
		MatDialogModule,
		MatInputModule,
		MatSelectModule,
		MatSlideToggleModule,
	],
	exports: [
		MatAutocompleteModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatIconModule,
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatOptionModule,
		MatProgressBarModule,
		MatRadioModule,
		MatSidenavModule,
		MatSortModule,
		MatToolbarModule,
		MatTableModule,
		MatDialogModule,
		MatInputModule,
		MatPaginatorModule,
		MatSelectModule,
		MatSlideToggleModule,
		SliderComponent,
		ButtonWithIconComponent,
		NavMenuComponent,
		TitlebarComponent,
		GridPageBarComponent,
	]
})
export class UIComponentsModule { }
