// Provide interface to data from VendorController
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractDataService } from './abstract-data.service';

// Controller-related Data Types
export interface Vendor {
	id: number;
	name: string;
	phoneNumber: string;
	websiteURL: string;
	address: string;
	address2: string;
	city: string;
	stateId: number;
	zipCode: string;
	emailAddress: string;
}

@Injectable({
  providedIn: 'root'
})
export class VendorsService extends AbstractDataService {
	init() {
		this.baseUrl = 'api/Vendors';
	}

	// Create a new vendor
	// POST: api/Vendors
	public create(newVendor: Vendor): Observable<Vendor> {
		return this.post<Vendor>('', newVendor);
	}
}
