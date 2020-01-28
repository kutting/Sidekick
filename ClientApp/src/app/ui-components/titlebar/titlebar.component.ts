/*
	TitlebarComponent: provide the DOM and behavior for the titlebar of grid pages.
*/
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-titlebar',
	templateUrl: './titlebar.component.html',
	styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent implements OnInit {
	@Input() title: string;		// name of grid page

	constructor() { }

	ngOnInit(): void {
	}
}
