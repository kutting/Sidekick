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
		'zipcode': [
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
		private readonly router: Router,
		private readonly stateCodesService: StateCodesService,
		private readonly vendorsService: VendorsService
	) {
		this.stateCodesService.allStateCodes().subscribe(result => {
			this.stateCodes = result.sort((a, b) => a.name < b.name ? -1 : 1);
		}, error => console.error(error));
	}

	ngOnInit() {
		this.createForms();
	}

	createForms() {
		// form validations
		this.vendorForm = this.fb.group({
			name: new FormControl('', Validators.compose([
				Validators.required,
				Validators.maxLength(500),
			])),
			address: ['', Validators.maxLength(250)],
			address2: ['', Validators.maxLength(250)],
			city: ['', Validators.maxLength(250)],
			stateId: [''],
			zipcode: new FormControl('', Validators.compose([
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
		});
	}

	// convenience getter for easy access to form fields
	get formField() { return this.vendorForm.controls; }

	onSubmit(value) {
		console.log(value);
		this.vendorsService.create(value)
			.subscribe((data: Vendor) => {
				console.log("Data returned from server is %o", data);
			},
				(error: any) => {
					window.alert(`A communication error happened when we tried to save your form. ${error}`);
				}, () => {
					this.location.back();
				}
			);
	}

	onCancel() {
		this.vendorForm.reset();
		this.location.back();
	}
}
