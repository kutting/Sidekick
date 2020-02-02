import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ICVResponse } from '../../data/comicvine.service';

@Component({
	selector: 'app-grid-page-bar',
	templateUrl: './grid-page-bar.component.html',
	styleUrls: ['./grid-page-bar.component.scss']
})
export class GridPageBarComponent implements OnInit {
	private _cvResponse: ICVResponse<any>;		// private variable so we can override setter on public Input
	totalPages: number;							// total pages in dataset
	isWaitingForNewPage: boolean = true;		// ComicVine sometimes takes awhile to respond

	// This is the response from ComicVine
	@Input()
	public set cvResponse(value: ICVResponse<any>) {
		this._cvResponse = value;
		if (value) {
			this.totalPages = Math.ceil(value.number_of_total_results / value.limit);
			this.isWaitingForNewPage = false;
		}
	}
	public get cvResponse(): ICVResponse<any> {
		return this._cvResponse;
	}

	// Whenever the user changes the page number in the input box, update the data
	@Output() public page: EventEmitter<number> = new EventEmitter<number>();

	constructor() { }

	ngOnInit() {
	}

	pageChanged(valueChangedEvent: Event): void {
		if (!this.cvResponse) {
			return;
		}

		let newPageNumber = parseInt((<HTMLInputElement>valueChangedEvent.target).value);
		if (newPageNumber > this.totalPages) {
			newPageNumber = this.totalPages;
			(<HTMLInputElement>valueChangedEvent.target).value = '' + newPageNumber;
		}
		this.page.emit(newPageNumber);
		this.isWaitingForNewPage = true;
	}
}
