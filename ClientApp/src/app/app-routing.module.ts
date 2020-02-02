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
import { ComicsAddComponent } from './comics/comics-add/comics-add.component';
import { ComicsEditComponent } from './comics/comics-edit/comics-edit.component';
import { ComicsSearchComponent } from './comics/comics-search/comics-search.component';
import { VendorsAddComponent } from './vendors/vendors-add/vendors-add.component';
import { VendorsEditComponent } from './vendors/vendors-edit/vendors-edit.component';
import { VendorsSearchComponent } from './vendors/vendors-search/vendors-search.component';
import { SearchSeriesComponent } from './comicvine/search-series/search-series.component';
import { SearchIssuesComponent } from './comicvine/search-issues/search-issues.component';
import { SearchPublishersComponent } from './comicvine/search-publishers/search-publishers.component';


// Define routes for all the app pages
// In a larger app, these would be split into the modules that the pages belong to
const routes: Routes = [
	{ path: '', redirectTo: '/comics-search', pathMatch: 'full' },
	{ path: 'counter', component: CounterComponent },
	{ path: 'fetch-data', component: FetchDataComponent },
	{ path: 'comics-search', component: ComicsSearchComponent },
	{ path: 'comic-add', component: ComicsAddComponent },
	{ path: 'comic-edit/:comicId', component: ComicsEditComponent },
	{ path: 'vendors-search', component: VendorsSearchComponent },
	{ path: 'vendor-add', component: VendorsAddComponent },
	{ path: 'vendor-edit/:vendorId', component: VendorsEditComponent },
	{ path: 'comicvine-series', component: SearchSeriesComponent },
	{ path: 'comicvine-issues', component: SearchIssuesComponent },
	{ path: 'comicvine-publishers', component: SearchPublishersComponent },
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
