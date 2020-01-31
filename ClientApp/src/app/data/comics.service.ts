// Provide interface to data from ComicsController
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractDataService } from './abstract-data.service';

// Controller-related Data Types
export interface Comic {
	comicId: number;
	title: string;
	issueNumber: string;
	description: string;
	purchaseDate: Date;
	vendorId: number;
	marvelId: number;
	marvelLastViewed: Date;
	comicVineId: number;
	comicVineLastViewed: Date;
	estimatedValue: number;
	conditionCodeId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ComicsService extends AbstractDataService {
	init() {
		this.baseUrl = 'api/Comics';
	}

	// Get all the comics, for example to display in the comics grid
	// GET: api/Comics
	public allComics(withObjects: boolean, searchFilters: any = null): Observable<Comic[]> {
		return this.getWithParams(withObjects ? 'withObjects' : '', searchFilters);
	}

	// Get a specific comic by Id
	// GET: api/Comics/5
	public getComic(comicId: number): Observable<Comic> {
		return this.get<Comic>(comicId.toString());
	}

	// Create a new vendor
	// POST: api/Comics
	public create(newComic: Comic): Observable<Comic> {
		return this.post<Comic>('', newComic);
	}

	// Update existing vendor
	// PUT: api/Comics/5
	public update(comic: Comic): Observable<Comic> {
		return this.put<Comic>(comic.comicId.toString(), comic);
	}
}
