import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ComicsService, Comic } from '../../data/comics.service';

// Describes the data available in our route
interface PageParams {
	comicId: number;
	eventName: string;
}

@Component({
	selector: 'app-comics-edit',
	templateUrl: './comics-edit.component.html',
	styleUrls: ['./comics-edit.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ComicsEditComponent implements OnInit {
	comicId: number;

	constructor(
		private readonly route: ActivatedRoute,
		private readonly location: Location,
		private readonly comicsService: ComicsService
	) {
	}

	ngOnInit() {
		// get comicId from route; this passes it to the comic view
		this.route.params.subscribe((data: PageParams) => {
			this.comicId = data.comicId;
		});
	}

	// The user clicked the Update button, so save comic to the database
	updateComic(comic: Comic) {
		this.comicsService.update(comic)
			.subscribe((data: Comic) => {
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
