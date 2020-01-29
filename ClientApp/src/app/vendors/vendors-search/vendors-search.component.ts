import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { VendorsService, Vendor } from '../../data/vendors.service';

@Component({
	selector: 'app-vendors-search',
	templateUrl: './vendors-search.component.html',
	styleUrls: ['./vendors-search.component.scss'],
})
export class VendorsSearchComponent implements OnInit {
	formGroup: FormGroup;
	dataSource: MatTableDataSource<Vendor>;
	displayedColumns: string[] = ['name', 'city', 'state', 'phone', 'actions'];
	private optionLabelToValueMap = {};		// key: filter property name => value: map (key: label => value: code)

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private router: Router,
		private readonly vendorsService: VendorsService
	) {
		// Get the data for the grid
		this.vendorsService.allVendors(true).subscribe(data => {
			data = data.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
			this.dataSource = new MatTableDataSource(data);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		});
	}

	ngOnInit() {
		// Parse the filter configuration, and generate the appropriate controls in the DOM
		this.formGroup = this.createFormGroup();

		// Hook changes to the form so that we update our grid data
		this.onFormChanges();
	}

	// Create form group for our filters
	private createFormGroup(): FormGroup {
		return new FormGroup({
			searchName: new FormControl(''),
			dateRangeFilter: new FormControl(''),
			beginDateFilter: new FormControl(''),
			endDateFilter: new FormControl(''),
			eventTypeFilter: new FormControl(''),
			specialEventTypeFilter: new FormControl('option1'),
			includeSpecialEventsFilter: new FormControl({ value: false, disabled: false }),
			locationTierFilter: new FormControl(''),
			excludeDeletedEventsFilter: new FormControl({ value: true, disabled: false }),
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
				// For filters like dropdowns, that have multiple text strings that can be selected, convert the text to a value
				if (val[key] && this.optionLabelToValueMap[key] !== undefined) {
					val[key] = this.optionLabelToValueMap[key][val[key]];
				}
				// For dates, format to DOW MMM DD YYYY
				if (typeof val[key] === 'object' && Object.prototype.toString.call(val[key]) === '[object Date]') {
					val[key] = val[key].toDateString();
				}
			});

			console.log("filter value changed! %o", val);
			/*
			// Emit the updated filter values so our owner can refresh the grid data
			this.values = val;
			this.filterChanged.emit({ filter: val, generateCSV: false, pageName: null } as FilterChangedCommand);
			*/
			this.vendorsService.allVendors(true, val).subscribe(data => {
				//data = data.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
				this.dataSource.data = data;
			});
		});
	}

	// The user clicked on the AddVendor button; navigate to the Add Vendor page
	createVendor() {
		this.router.navigate(['/vendor-add']);
	}

	// Handle clicks on Edit icon in Actions column of grid
	private edit(id: number): void {
		this.router.navigate(['/vendor-edit', id]);
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
