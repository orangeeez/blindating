import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'slice' })
export class SlicePipe implements PipeTransform {
    transform(items: any[], number: number): any {
        return items.slice(0, number);
    }
}