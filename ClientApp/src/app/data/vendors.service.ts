// Provide interface to data from VendorsController
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractDataService } from './abstract-data.service';

// Controller-related Data Types
export interface Vendor {
	vendorId: number;
	name: string;
	phoneNumber: string;
	websiteURL: string;
	address: string;
	address2: string;
	city: string;
	stateId: number;
	zipCode: string;
	emailAddress: string;
	isDeleted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VendorsService extends AbstractDataService {
	init() {
		this.baseUrl = 'api/Vendors';
	}

	// Get all the vendors, for example to display in the vendor grid
	// GET: api/Vendors
	public allVendors(withStates: boolean, searchFilters: any = null): Observable<Vendor[]> {
		return this.getWithParams(withStates ? 'withStates' : '', searchFilters);
	}

	// Get a specific vendor by Id
    // GET: api/Vendors/5
	public getVendor(vendorId: number): Observable<Vendor> {
		return this.get<Vendor>(vendorId.toString());
	}

	// Create a new vendor
	// POST: api/Vendors
	public create(newVendor: Vendor): Observable<Vendor> {
		newVendor.isDeleted = false;
		return this.post<Vendor>('', newVendor);
	}

	// Update existing vendor
    // PUT: api/Vendors/5
	public update(vendor: Vendor): Observable<Vendor> {
		return this.put<Vendor>(vendor.vendorId.toString(), vendor);
	}
}
