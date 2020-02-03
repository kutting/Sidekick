import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ComicsService, Comic } from '../../data/comics.service';

@Component({
	selector: 'app-comics-add',
	templateUrl: './comics-add.component.html',
	styleUrls: ['./comics-add.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ComicsAddComponent implements OnInit {

	constructor(
		private readonly location: Location,
		private readonly comicsService: ComicsService
	) { }

	ngOnInit() {
	}

	// The user has created a new comic in the view. Add it to the database
	addComic(comic: Comic) {
		this.comicsService.create(comic)
			.subscribe(
				(data: Comic) => {
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
