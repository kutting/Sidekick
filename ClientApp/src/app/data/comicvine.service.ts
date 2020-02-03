// Provide interface to data from ComicVine API
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService } from './abstract-data.service';

// Controller-related Data Types
import { ICVSeries, ICVIssue, ICVPublisher } from './icomic-vine';
export interface ICVResponse<T> {
	status_code: number;				//	An integer indicating the result of the request. Acceptable values are:
										//		1: OK
										//		100: Invalid API Key
										//		101: Object Not Found
										//		102: Error in URL Format
										//		103: 'jsonp' format requires a 'json_callback' argument
										//		104: Filter Error
										//		105: Subscriber only video is for subscribers only
	error: string;						//	A text string representing the status_code
	number_of_total_results: number;	//	The number of total results matching the filter conditions specified
	number_of_page_results: number;		//	The number of results on this page
	limit: number;						//	The value of the limit filter specified, or 100 if not specified
	offset: number;						//	The value of the offset filter specified, or 0 if not specified
	results: T;							//	Zero or more items that match the filters specified
}

@Injectable({
  providedIn: 'root'
})
export class ComicvineService extends AbstractDataService {

	// override constructor to specify domain to superclass
	constructor(
		http: HttpClient,
		@Inject('COMICVINE_API_KEY') private readonly apiKey: string
	) {
		super(http, 'https://comicvine.gamespot.com/');
	}

	init() {
		this.baseUrl = 'api';
	}

	// Get all the comics series, for example to display in the comics grid
	// GET: api/series_list
	public allSeries(searchFilters: any = null, resultsPage: number): Observable<ICVResponse<ICVSeries[]>> {
		return this.getJsonp<ICVResponse<ICVSeries[]>>('series_list', searchFilters, resultsPage);
	}

	// Get a specific comic by Id
	// GET: api/series
	public getSeries(seriesId: number): Observable<ICVResponse<ICVSeries>> {
		return this.getJsonp<ICVResponse<ICVSeries>>(`series/${seriesId}`);
	}

	// OVERRIDE default way of converting an entrypoint into a complete URL, to generate querystring format
	// and parameters required by comicvine API
	protected url(entrypoint: string, id?: number): string {
		return `${this.domain}${this.baseUrl}/${entrypoint}/?api_key=${this.apiKey}&format=jsonp`;
	}
}
