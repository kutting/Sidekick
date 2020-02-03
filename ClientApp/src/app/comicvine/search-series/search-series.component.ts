import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material';
import { ComicvineService, ICVResponse } from '../../data/comicvine.service';
import { ICVSeries } from '../../data/icomic-vine';
import { AbstractSearchComponent } from '../../ui-components/abstract-components/abstract-search-component';


@Component({
	selector: 'app-search-series',
	templateUrl: './search-series.component.html',
	styleUrls: ['./search-series.component.scss']
})
export class SearchSeriesComponent extends AbstractSearchComponent<ICVSeries> implements OnInit {
	cvResponse: ICVResponse<ICVSeries[]>;		// latest response from comicvine API
	seriesControl: FormControl;					// filter form
	currentPage: number = 0;					// current pages of results
	currentFilters: any;						// current values of filters in filters form

	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		router: Router,
		private readonly comicvine: ComicvineService
	) {
		super(router, ['thumb', 'name', 'count_of_episodes', 'publisher.name', 'actions']);
	}

	ngOnInit() {
		super.ngOnInit();
	}

	protected getGridData(searchFilters: any): void {
		this.currentFilters = searchFilters;
		this.comicvine.allSeries(searchFilters, this.currentPage).subscribe(response => {
			this.cvResponse = response;
			this.setGridData(response.results, null, this.sort);
		});
	}
	protected createFormGroup() {
		return new FormGroup({
			name: new FormControl('')
		});
	}

	getResultsPage(newPageNumber: number): void {
		if (newPageNumber > 0) {
			this.currentPage = newPageNumber;
			this.getGridData(this.currentFilters);
		}
	}
}
