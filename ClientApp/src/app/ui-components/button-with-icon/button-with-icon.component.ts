import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-with-icon',
  templateUrl: './button-with-icon.component.html',
  styleUrls: ['./button-with-icon.component.scss']
})
export class ButtonWithIconComponent implements OnInit {
	@Input() buttonStyle: string; // normal, primary (green), secondary (orange)
	@Input() icon: string;        // name of icon, e.g., add

  constructor() { }

  ngOnInit() {
  }
}
