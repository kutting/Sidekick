import { Component, EventEmitter, OnInit, Output } from '@angular/core';
//import { ApiResponse, ApiResponseStatus } from '../../../data/api-response-data';

@Component({
	selector: 'app-grid-messagebar',
	templateUrl: './grid-messagebar.component.html',
	styleUrls: ['./grid-messagebar.component.scss']
})
export class GridMessagebarComponent<T> implements OnInit {
	// provides super-components a pointer to this component controller
	@Output() component: EventEmitter<GridMessagebarComponent<T>> = new EventEmitter<GridMessagebarComponent<T>>();

	private requestCompleted: boolean;
	private requestCompletionMessage: string;

	constructor() { }

	ngOnInit() {
		this.component.emit(this);
		this.startRequest();
	}

	public startRequest(): void {
		console.log('GridMessagebarComponent::startRequest');
		this.requestCompleted = false;
	}

	public updateRequest(response: /*ApiResponse<T>*/any): void {
		console.log('GridMessagebarComponent::updateRequest %o', response);
		this.requestCompletionMessage = '';
		/*
		if (response.responseStatus === ApiResponseStatus.Partial) {
			this.requestCompletionMessage = 'This is a partial result set. Please refine your search to narrow the results.';
		} else if (response.responseStatus === ApiResponseStatus.Empty) {
			this.requestCompletionMessage = 'No data was returned.  Please refine your search.';
		} else if (response.responseStatus !== ApiResponseStatus.Success) {
			this.requestCompletionMessage = `Unknown Error Code ${response.responseStatus}. Please try again.`;
		}
		*/
	}

	public errorRequest(errorMessage: string): void {
		this.requestCompletionMessage = errorMessage;
		this.requestCompleted = true;
	}

	public requestComplete(): void {
		console.log('GridMessagebarComponent::requestComplete');
		this.requestCompleted = true;
	}
}
