import { Book, Filter } from './../../shared/model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filter'})

export class FilterPipe implements PipeTransform {
    transform(books: Book[], filters: Filter): any {
        return books.filter(item => {
            filters.title = filters.title || '';
            filters.author = filters.author || '';
            filters.genre = filters.genre || '';
            filters.isbin = filters.isbin || '';

            return (item.title.toLowerCase().indexOf(filters.title.toLowerCase()) >= 0 &&
            item.author.toLowerCase().indexOf(filters.author.toLowerCase()) >= 0 &&
            item.metadata.isbin.toLowerCase().indexOf(filters.isbin.toLowerCase()) >= 0 &&
            item.metadata.genre.toLowerCase().indexOf(filters.genre.toLowerCase()) >= 0 );
        });
    }
}

