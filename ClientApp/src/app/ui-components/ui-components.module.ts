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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Immaterial Components
import { SliderComponent } from './slider.component';
import { ButtonWithIconComponent } from './button-with-icon/button-with-icon.component';
import { GridMessagebarComponent } from './grid-messagebar/grid-messagebar.component';
import { GridTitlebarComponent } from './grid-titlebar/grid-titlebar.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TitlebarComponent } from './titlebar/titlebar.component';

@NgModule({
	declarations: [
		SliderComponent,
		ButtonWithIconComponent,
		/*
		GridMessagebarComponent,
		GridTitlebarComponent,
		*/
		NavMenuComponent,
		TitlebarComponent,
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
		MatSelectModule,
		MatSlideToggleModule,
		SliderComponent,
		ButtonWithIconComponent,
		NavMenuComponent,
		TitlebarComponent,
	]
})
export class UIComponentsModule { }
