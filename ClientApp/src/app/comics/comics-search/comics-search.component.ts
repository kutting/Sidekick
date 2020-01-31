import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ConditionCodesService, ConditionCode } from '../../data/condition-codes.service';
import { VendorsService, Vendor } from '../../data/vendors.service';
import { ComicsService, Comic } from '../../data/comics.service';

@Component({
	selector: 'app-comics-search',
	templateUrl: './comics-search.component.html',
	styleUrls: ['./comics-search.component.scss']
})
export class ComicsSearchComponent implements OnInit {
	formGroup: FormGroup;
	dataSource: MatTableDataSource<Comic>;
	displayedColumns: string[] = ['title', 'issueNumber', 'purchaseDate', 'vendor', 'condition', 'estimatedValue', 'actions'];

	conditionCodeControl: FormControl;
	conditionCodes: ConditionCode[];

	vendorControl: FormControl;
	vendors: Vendor[];
	filteredVendorNames: Observable<string[]>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private router: Router,
		private readonly conditionCodesService: ConditionCodesService,
		private readonly comicsService: ComicsService,
		private readonly vendorsService: VendorsService
	) {
		// Get the data for the grid
		this.comicsService.allComics(true).subscribe(data => {
			data = data.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1);
			this.dataSource = new MatTableDataSource(data);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		});

		// Get the data for the filters
		this.conditionCodesService.allConditionCodes().subscribe(result => {
			this.conditionCodes = result.sort((a, b) => a.name < b.name ? -1 : 1);
		}, error => console.error(error));
	}

	ngOnInit() {
		// Generate the appropriate controls in the DOM
		this.formGroup = this.createFormGroup();

		// Hook changes to the filters so that we update our grid data
		this.onFormChanges();

		// Feed the vendor names to the vendor auto-complete dropdown
		this.filteredVendorNames = this.vendorControl.valueChanges.pipe(
			startWith(''),
			map(value => this._filter(value))
		);
	}

	// For auto-complete of Vendors
	private _filter(value: string): string[] {
		if (!this.vendors) {
			return [];
		}

		const filterValue = value.toLowerCase();

		return this.vendors.filter(stateCode => stateCode.name.toLowerCase().indexOf(filterValue) === 0)
			.map(sc => sc.name);
	}

	// Create form group for our filters
	private createFormGroup(): FormGroup {
		this.conditionCodeControl = new FormControl('');
		this.vendorControl = new FormControl('');
		return new FormGroup({
			searchTitle: new FormControl(''),
			searchIssue: new FormControl(''),
			searchCondition: this.conditionCodeControl,
			searchVendor: this.vendorControl,
			searchEstimatedValueMin: new FormControl(''),
			searchEstimatedValueMax: new FormControl('')
		});
	}

	// Get changes to form; handy approach for grid filter forms
	// See: https://alligator.io/angular/reactive-forms-valuechanges/
	// For debouncing, see: https://netbasal.com/angular-reactive-forms-tips-and-tricks-bb0c85400b58
	private onFormChanges(): void {
		this.formGroup.valueChanges.pipe(
			debounceTime(300),
			distinctUntilChanged()
		).subscribe(val => {
			// Every time a value in one of the filter input fields changes (subject to debounce),
			// we receive an object where the keys are the property names from the FormGroup,
			// and the values are the user's input.
			Object.keys(val).map((key: string) => {
				// For dates, format to DOW MMM DD YYYY
				if (typeof val[key] === 'object' && Object.prototype.toString.call(val[key]) === '[object Date]') {
					val[key] = val[key].toDateString();
				}
			});

			// Ask server for updated list of record smatching the changed filters
			console.log("filter value changed! %o", val);
			this.comicsService.allComics(true, val).subscribe(data => {
				//data = data.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
				this.dataSource.data = data;
			});
		});
	}

	// The user clicked on the AddVendor button; navigate to the Add Vendor page
	createComic() {
		this.router.navigate(['/comic-add']);
	}

	// Handle clicks on Edit icon in Actions column of grid
	private edit(id: number): void {
		this.router.navigate(['/comic-edit', id]);
	}

	// Handle clicks on Delete icon in Actions column of grid
	private delete(id: number): void {
		this.alert('delete ' + id);
	}

	// For debugging
	private alert(message: string): void {
		window.alert(message);
	}
}
