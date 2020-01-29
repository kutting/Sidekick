import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { StateCode, StateCodesService } from '../../data/state-codes.service';
import { VendorsService, Vendor } from '../../data/vendors.service';


@Component({
	selector: 'app-forms-page',
	templateUrl: './vendors-add.component.html',
	styleUrls: ['./vendors-add.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class VendorsAddComponent implements OnInit {

	constructor(
		private readonly location: Location,
		private readonly vendorsService: VendorsService
	) { }

	ngOnInit() {
	}

	// The user has created a new vendor in the view. Add it to the database
	addVendor(vendor: Vendor) {
		this.vendorsService.create(vendor)
			.subscribe(
				(data: Vendor) => {
					console.log("Data returned from server is %o", data);
				},
				(error: any) => {
					window.alert(`A communication error happened when we tried to save your form. ${error}`);
				},
				() => {
					this.location.back();
				}
			);
	}
}
