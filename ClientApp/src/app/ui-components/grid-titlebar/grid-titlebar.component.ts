/*
	GridTitlebarComponent: provide the DOM and behavior for the titlebar of our grids.
	The titlebar includes buttons such as Show/Hide/Clear the filters, Download and Show All data, and column visibility control
*/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//import { NgForage } from 'ngforage';
//import { DynamicFilterComponent } from '../dynamic-filters/dynamic-filter/dynamic-filter.component';
import { IGridColumnData } from '../igrid-column-data';

@Component({
	selector: 'app-grid-titlebar',
	templateUrl: './grid-titlebar.component.html',
	styleUrls: ['./grid-titlebar.component.scss']
})
export class GridTitlebarComponent implements OnInit {
	@Input() title: string;                       // name of grid
//	@Input() filters: DynamicFilterComponent;     // The filters, if any, associated with the grid. Allows titlebar's Display All Matches & download all matches buttons to work.
	@Input() columns: IGridColumnData[];     	  // List of available columns and whether or not they are visible
	@Output() public columnsReady = new EventEmitter();

//	constructor(private ngf: NgForage) { }
	constructor() { }

	// Provide the key for the cache entry that is unique for he page, and differentiates it from other page-based datasets
	public get cacheKey(): string {
		return `${this.title}.columns`;
	}

	ngOnInit() {
		// pull column visibility info from cache
		this.setColumnsFromCache();
	}

	// Download all data that matches filter, instead of limiting to 100 rows
	// and, optionally, generate CSV file.
	private displayAllMatches(generateCSV: boolean): void {
//		this.filters.displayAllMatches(generateCSV, this.title);
	}

	// When the user clicks on a column name in the dropdown menu, toggle the column's visibility and update the cache
	private toggleColumn(column: IGridColumnData) {
		column.displayed = !column.displayed;
		this.saveColumnsInCache(this.columns);
	}

	// When the page is loaded, pull the column visibility information from the cache
	// and merge with the default data provided by the page component
	private setColumnsFromCache(): void {
		console.log('GridTitlebarComponent::setColumnsFromCache START');
		/*
		this.ngf.getItem(this.cacheKey).then((existingColumns?: IGridColumnData[]) => {
			console.log('GridTitlebarComponent::setColumnsFromCache READY');
			if (existingColumns) {
				// We can't just assign the value from the cache into the instance variable,
				// because columns may have been added or removed from the table.
				// Instead, we have to merge the data from the cache into the instance variable
				const keyedExistingColumns = {};
				existingColumns.forEach(aColumn => keyedExistingColumns[aColumn.htmlId] = aColumn);
				Object.keys(this.columns).forEach(key => {
					console.log('GridTitlebarComponent::setColumnsFromCache key = ' + key);
					const htmlId = this.columns[key].htmlId;
					return htmlId in keyedExistingColumns ? this.columns[key] = keyedExistingColumns[htmlId] : null;
				});
			}
			console.log('GridTitlebarComponent::setColumnsFromCache DONE');
		}).finally(() => {
			this.columnsReady.emit(this.columns);
		});
		*/
	}

	// Save the column visibilitiy information for the page into the browser cache
	private saveColumnsInCache(newValues: IGridColumnData[]): void {
		//this.ngf.setItem(this.cacheKey, newValues);
	}
}
