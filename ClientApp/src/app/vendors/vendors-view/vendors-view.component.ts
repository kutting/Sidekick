import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StateCode, StateCodesService } from '../../data/state-codes.service';
import { VendorsService, Vendor } from '../../data/vendors.service';


@Component({
	selector: 'app-vendors-view',
	templateUrl: './vendors-view.component.html',
	styleUrls: ['./vendors-view.component.scss']
})
export class VendorsViewComponent implements OnInit {
	@Input() vendorId: number;
	@Output() public submit = new EventEmitter();

	vendorForm: FormGroup;
	stateCodes: StateCode[];

	validation_messages = {
		'name': [
			{ type: 'required', message: 'Vendor name is required' },
			{ type: 'maxlength', message: 'Name cannot be more than 500 characters long' },
		],
		'address': [
			{ type: 'maxlength', message: 'Address cannot be more than 250 characters long' },
		],
		'address2': [
			{ type: 'maxlength', message: 'Address cannot be more than 250 characters long' },
		],
		'city': [
			{ type: 'maxlength', message: 'City cannot be more than 250 characters long' },
		],
		'zipCode': [
			{ type: 'maxlength', message: 'Zip Code cannot be more than 25 characters long' },
			{ type: 'pattern', message: 'Zip Code must be either 5 or 9 digits long' }
		],
		'websiteURL': [
			{ type: 'maxlength', message: 'Website URL cannot be more than 250 characters long' },
			{ type: 'pattern', message: 'URL must start with https:// or similar protocol' }
		],
		'emailAddress': [
			{ type: 'pattern', message: 'Enter a valid email address' },
			{ type: 'maxlength', message: 'Email Address cannot be more than 250 characters long' },
		],
		'phoneNumber': [
			{ type: 'required', message: 'Phone is required' },
			{ type: 'pattern', message: 'Enter a valid phone number' },
		]
	};

	constructor(
		private readonly fb: FormBuilder,
		private readonly location: Location,
		private readonly stateCodesService: StateCodesService,
		private readonly vendorsService: VendorsService
	) {
		// Get the data for dropdowns
		this.stateCodesService.allStateCodes().subscribe(result => {
			this.stateCodes = result.sort((a, b) => a.name < b.name ? -1 : 1);
		}, error => console.error(error));
	}

	ngOnInit() {
		// Generate the appropriate controls in the DOM
		this.vendorForm = this.createFormGroup();

		// If the view is being made in edit mode, load the existing vendor from the server, and display it.
		if (this.vendorId) {
			this.vendorsService.getVendor(this.vendorId).subscribe(
				(vendor: Vendor) => {
					console.log("Here is your vendor: %o and form %o", vendor, this.vendorForm);
					this.vendorForm.setValue(vendor);
				}
			);
		}
	}

	// Create form group for our form
	createFormGroup(): FormGroup {
		const controlsConfig = {
			stateCode: [null],
			comics: [null],
			name: new FormControl('', Validators.compose([
				Validators.required,
				Validators.maxLength(500),
			])),
			address: ['', Validators.maxLength(250)],
			address2: ['', Validators.maxLength(250)],
			city: ['', Validators.maxLength(250)],
			stateCodeId: [null],
			zipCode: new FormControl('', Validators.compose([
				Validators.pattern('^[0-9]{5}(?:-?[0-9]{4})?$'),
				Validators.maxLength(25),
			])),
			websiteURL: new FormControl('', Validators.compose([
				Validators.maxLength(250),
				// pattern from: http://regexlib.com/REDetails.aspx?regexp_id=501
				Validators.pattern('^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$')
			])),
			emailAddress: new FormControl('', Validators.compose([
				Validators.maxLength(250),
				Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
			])),
			phoneNumber: new FormControl('', Validators.compose([
				Validators.maxLength(250),
				// pattern from: http://regexlib.com/Search.aspx?k=phone+number&c=-1&m=-1&ps=20
				Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
			])),
		};

		// If the view is being made in edit mode, add a (hidden) control for the record id.
		// If this control is present for Create version of form, it makes the POST fail
		if (this.vendorId) {
			controlsConfig['vendorId'] = new FormControl([]);
		}

		return this.fb.group(controlsConfig);
	}

	// Convenience getter for easy access to form fields
	get formField() { return this.vendorForm.controls; }

	// Let client view know when user hits the Submit button
	onSubmit(event: MouseEvent, vendor: Vendor) {
		event.stopPropagation();
		this.submit.emit(vendor);
	}

	// If user cancels, return to previous page
	onCancel() {
		this.vendorForm.reset();
		this.location.back();
	}
}
