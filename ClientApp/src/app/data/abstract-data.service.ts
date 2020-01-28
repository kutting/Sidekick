/// This class simplifies the work of using HttpClient for the data services.
/// There is one data service per WebAPI Controller class
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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
		@Inject('BASE_URL') private readonly domain: string
	) {
		this.init();
	}

	abstract init(): void;

	protected get<T>(entrypoint: string): Observable<T> {
		return this.http.get<T>(this.url(entrypoint))
			.pipe(
				retry(3), 							// retry a failed request up to 3 times
				catchError(this.handleError)		// then handle the error
			);
	}

	protected getWithParams<T>(entrypoint: string, searchFilters: any): Observable<T> {
		return this.http.get<T>(this.url(entrypoint), searchFilters ? { params: searchFilters } : {})
			.pipe(
				retry(3), 							// retry a failed request up to 3 times
				catchError(this.handleError)		// then handle the error
			);
	}

	protected post<T>(entrypoint: string, data: T): Observable<T> {
		return this.http.post<T>(this.url(entrypoint), data, this.httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	protected put<T>(entrypoint: string, data: T): Observable<T> {
		return this.http.put<T>(this.url(entrypoint), data, this.httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	protected delete(entrypoint: string, id: number): Observable<{}> {
		return this.http.delete(this.url(entrypoint, id), this.httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	private url(entrypoint: string, id?: number): string {
		return `${this.domain}${this.baseUrl}/${entrypoint}${id ? `/${id}` : ''}`;
	}

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
