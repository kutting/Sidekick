import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendors-search',
  templateUrl: './vendors-search.component.html',
  styleUrls: ['./vendors-search.component.scss']
})
export class VendorsSearchComponent implements OnInit {
	formGroup: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
	  this.formGroup = new FormGroup({
		  dateRangeFilter: new FormControl(''),
		  beginDateFilter: new FormControl(''),
		  endDateFilter: new FormControl(''),
		  eventTypeFilter: new FormControl(''),
		  specialEventTypeFilter: new FormControl('option1'),
		  includeSpecialEventsFilter: new FormControl({ value: false, disabled: false }),
		  locationFilter: new FormControl(''),
		  locationTierFilter: new FormControl(''),
		  excludeDeletedEventsFilter: new FormControl({ value: true, disabled: false }),
	  });
  }

	createVendor() {
		this.router.navigate(['/vendor-add']);
	}
}
