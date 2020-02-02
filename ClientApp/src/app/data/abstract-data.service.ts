/// This class simplifies the work of using HttpClient for the data services.
/// There is one data service per WebAPI Controller class
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractDataService {
	protected baseUrl = '';		// base URL for the instances calls to the API, e.g., api/comics

	protected httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		})
	};

	constructor(
		private readonly http: HttpClient,
		@Inject('BASE_URL') protected readonly domain: string
	) {
		this.init();
	}

	abstract init(): void;

	// Get all records at the specified entrypoint
	protected get<T>(entrypoint: string): Observable<T> {
		return this.http.get<T>(this.url(entrypoint))
			.pipe(
				retry(3), 							// retry a failed request up to 3 times
				catchError(this.handleError)		// then handle the error
			);
	}

	// Search for records that match the search parameters
	protected getWithParams<T>(entrypoint: string, searchFilters: any): Observable<T> {
		return this.http.get<T>(this.url(entrypoint), searchFilters ? { params: searchFilters } : {})
			.pipe(
				retry(3), 							// retry a failed request up to 3 times
				catchError(this.handleError)		// then handle the error
			);
	}

	protected getJsonp<T>(entrypoint: string, searchFilters: object, resultsPage: number): Observable<T> {
		let qs = "";
		if (searchFilters)
			qs += this.querystringFromObject(searchFilters);
		if (resultsPage)
			qs += "&offset=" + 100 * (resultsPage - 1);

		return this.http.jsonp<T>(this.url(entrypoint) + qs, 'json_callback')
			.pipe(
				retry(3), 							// retry a failed request up to 3 times
				catchError(this.handleError)		// then handle the error
			);
	}

	// insert a new record
	protected post<T>(entrypoint: string, data: T): Observable<T> {
		return this.http.post<T>(this.url(entrypoint), data, this.httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	// edit an existing record
	protected put<T>(entrypoint: string, data: T): Observable<T> {
		return this.http.put<T>(this.url(entrypoint), data, this.httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	// delete a record
	protected delete(entrypoint: string, id: number): Observable<{}> {
		return this.http.delete(this.url(entrypoint, id), this.httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	// convert an entrypoint into a complete URL
	protected url(entrypoint: string, id?: number): string {
		return `${this.domain}${this.baseUrl}/${entrypoint}${id ? `/${id}` : ''}`;
	}

	// convert an object into a querystring
	private querystringFromObject(anObject: object): string {
		if (!anObject)
			return '';

		const qsPairs = Object.keys(anObject).map(aKey => `${aKey}:${anObject[aKey]}`);
		return "&filter=" + qsPairs.join(',');
	}

	// If an error occurs, report to the user
	private handleError(error: HttpErrorResponse) {
		let message = '';
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			message = 'A Communications Error occurred:' + error.error.message;
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			console.error(
				`The Communications Layer returned error code ${error.status}, ` +
				`error body was: ${error.error}`);
		}
		// return an observable with a user-facing error message
		return throwError('Error communicating with server; please try again later.');
	}
}
