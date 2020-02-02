import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UIComponentsModule } from './ui-components/ui-components.module';
import { AppRoutingModule } from './app-routing.module';

// The app page components
import { FetchDataComponent } from './fetch-data/fetch-data.component';

// The app modules
import { ComicsModule } from './comics/comics.module';
import { VendorsModule } from './vendors/vendors.module';
import { ComicvineModule } from './comicvine/comicvine.module';

@NgModule({
	declarations: [
		AppComponent,
		FetchDataComponent,
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
		HttpClientModule,
		FormsModule,
		UIComponentsModule,
		ComicsModule,
		ComicvineModule,
		VendorsModule,
		BrowserAnimationsModule,
		AppRoutingModule,		// Contains routes: MUST be after all the other feature modules for routing to work properly because it contains the wildcard route
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
