import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UIComponentsModule } from './ui-components/ui-components.module';
import { AppRoutingModule } from './app-routing.module';

//import { PhonePipe } from './ui-components/pipe-phone/pipe-phone.pipe';

// The app page components
import { FetchDataComponent } from './fetch-data/fetch-data.component';

// The app modules
import { ComicsModule } from './comics/comics.module';
import { VendorsModule } from './vendors/vendors.module';

@NgModule({
	declarations: [
		AppComponent,
		FetchDataComponent,
		//PhonePipe,
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
		HttpClientModule,
		FormsModule,
		UIComponentsModule,
		ComicsModule,
		VendorsModule,
		BrowserAnimationsModule,
		AppRoutingModule,		// Contains routes: MUST be after all the other feature modules for routing to work properly because it contains the wildcard route
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
