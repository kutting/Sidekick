import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StateCodesService, StateCode } from '../../data/state-codes.service';
import { VendorsService, Vendor } from '../../data/vendors.service';
import { AbstractSearchComponent } from '../../ui-components/abstract-components/abstract-search-component';

@Component({
	selector: 'app-vendors-search',
	templateUrl: './vendors-search.component.html',
	styleUrls: ['./vendors-search.component.scss'],
})
export class VendorsSearchComponent extends AbstractSearchComponent<Vendor> implements OnInit {
	stateCodeControl: FormControl;
	stateCodes: StateCode[];
	filteredStateNames: Observable<string[]>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		router: Router,
		private readonly stateCodesService: StateCodesService,
		private readonly vendorsService: VendorsService
	) {
		super(router, ['name', 'city', 'stateCode.abbreviation', 'phoneNumber', 'actions']);
	}

	ngOnInit() {
		super.ngOnInit();

		// Feed the state codes to the state autocomplete dropdown
		this.filteredStateNames = this.stateCodeControl.valueChanges.pipe(
			startWith(''),
			map(value => this._filter(value))
		);
	}

	// Get the data for the grid from the server, optionally filtered by specified values
	getGridData(searchFilters: any): void {
		this.vendorsService.allVendors(true, searchFilters).subscribe(data => {
			//data = data.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
			this.setGridData(data, this.paginator, this.sort);
		});
	}

	// Get the data for the filters
	getFilterData() {
		this.stateCodesService.allStateCodes().subscribe(result => {
			this.stateCodes = result.sort((a, b) => a.name < b.name ? -1 : 1);
		}, error => console.error(error));
	}

	// For auto-complete of StateCodes
	private _filter(value: string): string[] {
		if (!this.stateCodes) {
			return [];
		}

		const filterValue = value.toLowerCase();

		return this.stateCodes.filter(stateCode => stateCode.name.toLowerCase().indexOf(filterValue) === 0)
			.map(sc => sc.name);
	}

	// Create form group for our filters
	protected createFormGroup(): FormGroup {
		this.stateCodeControl = new FormControl('');
		return new FormGroup({
			searchName: new FormControl(''),
			searchCity: new FormControl(''),
			searchState: this.stateCodeControl,
			searchPhone: new FormControl(''),
		});
	}

	// Handle clicks on Delete icon in Actions column of grid
	private delete(id: number): void {
		this.alert('delete ' + id);
	}
}
