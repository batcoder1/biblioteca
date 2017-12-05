import { JsonResponse } from './../shared/model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BOOKS_URL } from './../shared/constants';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Book } from '../shared/model';

@Injectable()
export class BookService {

  constructor(private http: HttpClient) { }


  getBooks(): Observable<Book[]> {
      return this.http.get(BOOKS_URL)
      .pipe(
        map((result: JsonResponse) => {
          let books: Book[] = [];
          result.books.forEach((element: Book) => {
            const book = new Book(element);
            books = [...books, book];
          });
          return books;
        })
        );
  }
}
