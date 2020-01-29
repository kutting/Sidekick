// Provide interface to data from StateCodesController
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractDataService } from './abstract-data.service';

// Controller-related Data Types
export interface StateCode {
	stateCodeId: number;
	abbreviation: string;
	name: string;
	description: string;
}


@Injectable({
	providedIn: 'root'
})
export class StateCodesService extends AbstractDataService {
	init() {
		this.baseUrl = 'api/StateCodes';
	}

	// Get all the state codes, for example to display in a dropdown list
	// GET: api/StateCodes
	public allStateCodes(): Observable<StateCode[]> {
		return this.getWithParams('', null);
	}
}
