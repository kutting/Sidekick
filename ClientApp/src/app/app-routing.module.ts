///////////////////////////////////////////////////////////////////////////////////////
// App Routing Module
// (Root of) Routes data
///////////////////////////////////////////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import all the app page components
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// import all the app page modules
import { VendorsAddComponent } from './vendors/vendors-add/vendors-add.component';
import { VendorsSearchComponent } from './vendors/vendors-search/vendors-search.component';
import { FormsComponent } from './vendors/forms/forms.component';
import { AddComponent } from './vendors/add/add.component';


// Define routes for all the app pages
// In a larger app, these would be split into the modules that the pages belong to
const routes: Routes = [
	{ path: '', redirectTo: '/vendors-search', pathMatch: 'full' },
	{ path: 'counter', component: CounterComponent },
	{ path: 'fetch-data', component: FetchDataComponent },
	{ path: 'vendors-search', component: VendorsSearchComponent },
	{ path: 'vendor-add', component: VendorsAddComponent },
	{ path: 'test-form', component: FormsComponent },
	{ path: 'add', component: AddComponent },
	{ path: '**', component: PageNotFoundComponent }
];

// Set enableTracing to true to enable debugging output in the console that shows you how each route is resolved
@NgModule({
	declarations: [
		CounterComponent,
		PageNotFoundComponent
	],
	imports: [RouterModule.forRoot(routes, { enableTracing: false })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
