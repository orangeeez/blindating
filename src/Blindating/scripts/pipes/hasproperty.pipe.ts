import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'hasproperty' })
export class HasPropertyPipe implements PipeTransform {
    transform(items: any[], value: any): any {
        var property = value.replace(/\s+/g, '');
        property = property.charAt(0).toLowerCase() + property.slice(1);
        if (items.hasOwnProperty(property)) {
            return items[property];
        }
    }
}