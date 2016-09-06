import { Pipe, PipeTransform } from 'angular2/core';
@Pipe({ name: 'iterateOverObject' })
export class IterateOverObjectPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        var value = args[0].value.replace(/\s+/g, '');
        if (items.hasOwnProperty(value))
            return items[value];
    }
}