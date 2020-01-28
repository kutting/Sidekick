// Provide interface to data from ConditionCodesController
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractDataService } from './abstract-data.service';

// Controller-related Data Types
export interface ConditionCode {
	id: number;
	name: string;
	description: string;
}


@Injectable({
  providedIn: 'root'
})
export class ConditionCodesService extends AbstractDataService {
	init() {
		this.baseUrl = 'api/ConditionCodes';
	}

	// Get all the condition codes, for example to display in a dropdown list
	// GET: api/ConditionCodes
	public allConditionCodes(): Observable<ConditionCode[]> {
		return this.getWithParams('', null);
	}
}
