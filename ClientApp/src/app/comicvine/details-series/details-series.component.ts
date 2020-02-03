import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ComicvineService, ICVResponse } from '../../data/comicvine.service';
import { ICVSeries, ICVEpisode } from '../../data/icomic-vine';

// Describes the data available in our route
interface PageParams {
	seriesId: number;
	eventName: string;
}

@Component({
	selector: 'app-details-series',
	templateUrl: './details-series.component.html',
	styleUrls: ['./details-series.component.scss'],
	encapsulation: ViewEncapsulation.None

})
export class DetailsSeriesComponent implements OnInit {
	seriesId: number;							// Id of the Series we are providing the user details for
	series: ICVSeries = <ICVSeries>{};			// Data returned from comicvine
	dataSource: MatTableDataSource<ICVEpisode>;
	displayedColumns: string[] = ['number', 'name'];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private readonly route: ActivatedRoute,
		private readonly location: Location,
		private readonly comicvineService: ComicvineService
	) { }

	ngOnInit() {
		// get seriesId from route
		this.route.params.subscribe((data: PageParams) => {
			this.seriesId = data.seriesId;
		});

		// If the view is being made in edit mode, load the existing comic from the server, and display it.
		if (this.seriesId) {
			this.comicvineService.getSeries(this.seriesId).subscribe(
				(response: ICVResponse<ICVSeries>) => {
					this.series = response.results;
					this.dataSource = new MatTableDataSource(response.results.episodes);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				}
			);
		}
	}

	// When user clicks on back button, return to previous page
	onCancel() {
		this.location.back();
	}
}
