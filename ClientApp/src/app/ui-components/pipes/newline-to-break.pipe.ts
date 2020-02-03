import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'newlineToBreak'
})
export class NewlineToBreakPipe implements PipeTransform {

	transform(value: string): string {
		if (!value) return '';
		return value.replace(/\n/g, '<br/>');
	}
}
