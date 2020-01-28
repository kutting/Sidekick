///////////////////////////////////////////////////////////////////////////////////////
// This is a Control that provides a toggle/checkbox, where the label switches based on
// whether the checkbox is checked or unchecked
//
// For info on ControlValueAccessor, which lets this Component act as a Control,
// see: https://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html
///////////////////////////////////////////////////////////////////////////////////////
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-slider',
	template: `
		<mat-slide-toggle class="example-margin" [color]="color" [(ngModel)]="isSet" (change)="onChange()" [disabled]="isDisabled">
			{{isSet ? labelSet : labelUnset}}
		</mat-slide-toggle>
	`,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SliderComponent),
			multi: true
		}
	]
})
export class SliderComponent implements OnInit, ControlValueAccessor {
	@Input() labelSet: string;
	@Input() labelUnset: string;
	@Input() isSet = false;
	@Input() isDisabled = false;
	@Input() color: string;
	propagateChange = (_: any) => { };

	constructor() { }

	ngOnInit() {
	}

	onChange() {
		this.propagateChange(this.isSet);
	}

	// Methods for ControlValueAccessor, to allow this component to be treated as a Control
	writeValue(obj: any): void {
		if (obj !== undefined) {
			this.isSet = obj as boolean;
		}
	}
	registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}
	registerOnTouched(fn: any): void {
	}
	setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}
}
