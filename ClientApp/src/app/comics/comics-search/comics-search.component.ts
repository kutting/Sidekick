import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ConditionCodesService, ConditionCode } from '../../data/condition-codes.service';
import { VendorsService, Vendor } from '../../data/vendors.service';
import { ComicsService, Comic } from '../../data/comics.service';
import { AbstractSearchComponent } from '../../ui-components/abstract-components/abstract-search-component';

@Component({
	selector: 'app-comics-search',
	templateUrl: './comics-search.component.html',
	styleUrls: ['./comics-search.component.scss']
})
export class ComicsSearchComponent extends AbstractSearchComponent<Comic> implements OnInit {
	conditionCodeControl: FormControl;
	conditionCodes: ConditionCode[];

	vendorControl: FormControl;
	vendors: Vendor[];
	filteredVendorNames: Observable<string[]>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		protected router: Router,
		private readonly conditionCodesService: ConditionCodesService,
		private readonly comicsService: ComicsService,
		private readonly vendorsService: VendorsService
	) {
		// Give superclass the ids of the displayed columns of the grid
		super(router, ['title', 'issueNumber', 'purchaseDate', 'vendor', 'condition', 'estimatedValue', 'actions']);
	}

	ngOnInit() {
		super.ngOnInit();

		// Feed the vendor names to the vendor auto-complete dropdown
		this.filteredVendorNames = this.vendorControl.valueChanges.pipe(
			startWith(''),
			map(value => this._filter(value))
		);
	}

	// Get the data for the grid from the server, optionally filtered by specified values
	getGridData(searchFilters: any): void {
		this.comicsService.allComics(true, searchFilters).subscribe(data => {
			data = data.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1);
			this.setGridData(data, this.paginator, this.sort);
		});
	}

	// Get the data for the filters
	getFilterData() {
		this.conditionCodesService.allConditionCodes().subscribe(result => {
			this.conditionCodes = result;
		}, error => console.error(error));
		this.vendorsService.allVendors(false).subscribe(result => {
			this.vendors = result.sort((a, b) => a.name < b.name ? -1 : 1);
		}, error => console.error(error));
	}

	// For auto-complete of Vendors
	private _filter(value: string): string[] {
		if (!this.vendors) {
			return [];
		}

		const filterValue = value.toLowerCase();

		return this.vendors.filter(vendor => vendor.name.toLowerCase().indexOf(filterValue) === 0)
			.map(v => v.name);
	}

	// Create form group for our filters
	protected createFormGroup(): FormGroup {
		this.conditionCodeControl = new FormControl('');
		this.vendorControl = new FormControl('');
		return new FormGroup({
			searchTitle: new FormControl(''),
			searchIssue: new FormControl(''),
			searchConditionCode: this.conditionCodeControl,
			searchVendor: this.vendorControl,
			searchEstimatedValueMin: new FormControl(''),
			searchEstimatedValueMax: new FormControl('')
		});
	}

	// Handle clicks on Delete icon in Actions column of grid
	private delete(id: number): void {
		this.alert('delete ' + id);
	}
}
