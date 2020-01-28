// Provides a button with an icon, like the ones in the GridTitlebarComponent
// For list of available icons, see:
//	https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/
//	https://material.io/resources/icons/?style=baseline
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss']
})
export class ButtonIconComponent implements OnInit {
	@Input() buttonStyle: string; // normal, primary (green), secondary (orange)
	@Input() icon: string;        // name of icon, e.g., add
	@Input() title: string;       // title to display to user on hover

  constructor() { }

  ngOnInit() {
  }
}
