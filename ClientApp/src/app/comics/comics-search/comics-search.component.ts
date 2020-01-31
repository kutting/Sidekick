import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StateCodesService, StateCode } from '../../data/state-codes.service';
import { VendorsService, Vendor } from '../../data/vendors.service';
import { ComicsService, Comic } from '../../data/comics.service';

@Component({
	selector: 'app-comics-search',
	templateUrl: './comics-search.component.html',
	styleUrls: ['./comics-search.component.scss']
})
export class ComicsSearchComponent implements OnInit {
	formGroup: FormGroup;
	stateCodeControl: FormControl;
	dataSource: MatTableDataSource<Comic>;
	stateCodes: StateCode[];
	filteredOptions: Observable<string[]>;
	displayedColumns: string[] = ['title', 'issueNumber', 'purchaseDate', 'vendor', 'condition'];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private router: Router,
		private readonly stateCodesService: StateCodesService,
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
		this.stateCodesService.allStateCodes().subscribe(result => {
			this.stateCodes = result.sort((a, b) => a.name < b.name ? -1 : 1);
		}, error => console.error(error));
	}

	ngOnInit() {
	}

}
