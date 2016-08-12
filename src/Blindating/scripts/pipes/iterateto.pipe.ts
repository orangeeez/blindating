import { Pipe, PipeTransform } from 'angular2/core';
@Pipe({ name: 'iterateto' })
export class IterateToPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        return items.slice(0, args[0].to);
    }
}