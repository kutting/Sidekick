import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StateCode, StateCodesService } from '../../data/state-codes.service';
import { VendorsService, Vendor } from '../../data/vendors.service';
import { ComicsService, Comic } from '../../data/comics.service';

@Component({
	selector: 'app-comics-view',
	templateUrl: './comics-view.component.html',
	styleUrls: ['./comics-view.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ComicsViewComponent implements OnInit {
	@Input() comicId: number;
	@Output() public submit = new EventEmitter();

	comicForm: FormGroup;
	stateCodes: StateCode[];


	validation_messages = {
		'title': [
			{ type: 'required', message: 'Comic title is required' },
			{ type: 'maxlength', message: 'Title cannot be more than 500 characters long' },
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
		this.stateCodesService.allStateCodes().subscribe(result => {
			this.stateCodes = result.sort((a, b) => a.name < b.name ? -1 : 1);
		}, error => console.error(error));
	}

	ngOnInit() {
	}

}
