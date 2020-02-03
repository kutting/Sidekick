// Abstract superclass for Searh components, like comics/comic-search.
//	T	is the type of record in the grid rows
//
// Subclasses need to
//	get the data for the grid
//	get the data for any filter controls that require data, such as dropdowns,
//	and create the filter controls.
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

export abstract class AbstractSearchComponent<T> implements OnInit {
	formGroup: FormGroup;
	dataSource: MatTableDataSource<T>;

	constructor(protected router: Router, protected displayedColumns: string[]) { }

	// Get the data for the grid from the server, optionally filtered by specified values
	protected abstract getGridData(searchFilters: any): void;

	// Get the data needed for any dropdown, auto-complete, etc controls in the filters
	// Do nothing by default, in case there aren't any such filter controls
	protected getFilterData(): void { }

	// Create the controls for the filters form
	protected abstract createFormGroup();

	ngOnInit() {
		// get the data for the grid and the filters
		this.getGridData(null);
		this.getFilterData();

		// Generate the appropriate controls in the DOM
		this.formGroup = this.createFormGroup();

		// Hook changes to the filters so that we update our grid data
		this.onFormChanges();
	}

	// Set the data for the grid
	// Use a custom sortingDataAccessor, to handle columns that rely on nested properties
	// See: https://stackoverflow.com/questions/48891174/angular-material-2-datatable-sorting-with-nested-objects
	protected setGridData(data: T[], paginator?: MatPaginator, sort?: MatSort): void {
		this.dataSource = new MatTableDataSource<T>(data);

		this.dataSource.sortingDataAccessor = (item: T, property: string) => {
			if (property.includes('.'))
				return property.split('.').reduce((obj, key:string) => obj ? obj[key] : null, item)
			return item ? item[property] : null;
		};

		if (paginator) {
			this.dataSource.paginator = paginator;
		}
		if (sort) {
			this.dataSource.sort = sort;
		}
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
				// For numeric filters, they can get set to zero when cleared, which causes c# to reject the GET, so remove the key from the object.
				if (typeof val[key] === 'object' && Object.prototype.toString.call(val[key]) === '[object Date]') {
					val[key] = val[key].toDateString();
				} else if (val[key] === null) {
					delete val[key];
				}
			});

			// Ask server for updated list of records matching the changed filters
			this.getGridData(val);
		});
	}

	protected gotoPage(route: string, id?: number) {
		if (!id) {
			this.router.navigate([route]);
		} else {
			this.router.navigate([route, id]);
		}
	}

	// For debugging
	protected alert(message: string): void {
		window.alert(message);
	}
}
