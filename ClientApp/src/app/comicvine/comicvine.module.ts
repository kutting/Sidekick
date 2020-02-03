import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';		// to support JsonP
import { UIComponentsModule } from '../ui-components/ui-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';                   // Flexbox
import { SearchSeriesComponent } from './search-series/search-series.component';
import { SearchIssuesComponent } from './search-issues/search-issues.component';
import { SearchPublishersComponent } from './search-publishers/search-publishers.component';
import { DetailsSeriesComponent } from './details-series/details-series.component';
import { NewlineToBreakPipe } from '../ui-components/pipes/newline-to-break.pipe';



@NgModule({
	declarations: [
		SearchSeriesComponent, SearchIssuesComponent, SearchPublishersComponent, DetailsSeriesComponent,
		NewlineToBreakPipe,
	],
  imports: [
	  CommonModule,
	  HttpClientJsonpModule, HttpClientModule,
	  UIComponentsModule,
	  FormsModule,
	  ReactiveFormsModule,
	  FlexLayoutModule,
  ]
})
export class ComicvineModule { }
