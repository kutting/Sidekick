import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ComicsService, Comic } from '../../data/comics.service';
import { ConditionCodesService, ConditionCode } from '../../data/condition-codes.service';
import { VendorsService, Vendor } from '../../data/vendors.service';

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
	conditionCodes: ConditionCode[];
	vendors: Vendor[];

	validation_messages = {
		'title': [
			{ type: 'required', message: 'Comic title is required' },
			{ type: 'maxlength', message: 'Title cannot be more than 500 characters long' },
		],
		'issueNumber': [
			{ type: 'maxlength', message: 'Issue Number cannot be more than 50 characters long' },
		]
	};

	constructor(
		private readonly fb: FormBuilder,
		private readonly location: Location,
		private readonly comicsService: ComicsService,
		private readonly conditionCodesService: ConditionCodesService,
		private readonly vendorsService: VendorsService
	) {
		// Get the data for dropdowns
		this.conditionCodesService.allConditionCodes().subscribe(result => {
			this.conditionCodes = result.sort((a, b) => a.name < b.name ? -1 : 1);
		}, error => console.error(error));
		this.vendorsService.allVendors(false).subscribe(result => {
			this.vendors = result.sort((a, b) => a.name < b.name ? -1 : 1);
		}, error => console.error(error));
	}

	ngOnInit() {
		// Generate the appropriate controls in the DOM
		this.comicForm = this.createFormGroup();

		if (this.comicId) {
			this.comicsService.getComic(this.comicId).subscribe(
				(comic: Comic) => {
					console.log("Here is your comic: %o and form %o", comic, this.comicForm);
					// TODO populate into form
					this.comicForm.setValue(comic);
				}
			);
		}
	}

	createFormGroup(): FormGroup {
		const controlsConfig = {
			title: new FormControl('', Validators.compose([
				Validators.required,
				Validators.maxLength(500),
			])),
			issueNumber: new FormControl('', Validators.maxLength(50)),
			purchaseDate: [null],
			vendorId: [null],
			estimatedValue: [null],
			conditionCodeId: [null],
			description: ['']
		};

		// If the view is being made in edit mode, add a (hidden) control for the record id.
		// If this control is present for Create version of form, it makes the POST fail
		if (this.comicId) {
			controlsConfig['comicId'] = new FormControl([]);
			controlsConfig['marvelId'] = [null];
			controlsConfig['marvelLastViewed'] = [null];
			controlsConfig['comicVineId'] = [null];
			controlsConfig['comicVineLastViewed'] = [null];
		}

		return this.fb.group(controlsConfig);
	}

	// convenience getter for easy access to form fields
	get formField() { return this.comicForm.controls; }

	// Let client view know when user hits the Submit button
	onSubmit(event: MouseEvent, comic: Comic) {
		event.stopPropagation();
		this.submit.emit(comic);
	}

	// If user cancels, return to previous page
	onCancel() {
		this.comicForm.reset();
		this.location.back();
	}
}
