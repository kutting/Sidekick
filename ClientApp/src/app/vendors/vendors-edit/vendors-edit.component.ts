import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VendorsService, Vendor } from '../../data/vendors.service';

// Describes the data available in our route
interface PageParams {
	vendorId: number;
	eventName: string;
}

@Component({
	selector: 'app-vendors-edit',
	templateUrl: './vendors-edit.component.html',
	styleUrls: ['./vendors-edit.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class VendorsEditComponent implements OnInit {
	vendorId: number;

	constructor(
		private readonly route: ActivatedRoute,
		private readonly location: Location,
		private readonly vendorsService: VendorsService
	) {
	}

	ngOnInit() {
		// get vendorId from route; this passes it to the vendor view
		this.route.params.subscribe((data: PageParams) => {
			this.vendorId = data.vendorId;
		});
	}

	// The user clicked the Update button, so save vendor to the database
	updateVendor(vendor: Vendor) {
		this.vendorsService.update(vendor)
			.subscribe((data: Vendor) => {
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
