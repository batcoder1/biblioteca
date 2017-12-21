import { USERS } from './../../shared/constants';
import { BookService } from './../../services/book.service';
import { Book, Reader } from '../../shared/model';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
    books: Book[] = [];
    new = false;
    readers: Reader[] = [];
    book: Book;
    estado = 'Lectores';
    constructor(private bookService: BookService) {
    }

    ngOnInit() {
        this.bookService.getBooks()
            .subscribe(result => {
                this.books = result;
                USERS.forEach(user => {
                    const reader = new Reader(user, []);
                    this.books.forEach(book => {
                        book.users.forEach(lect => {
                            if (user.id === lect.id) {
                                reader.read.push(book.title);
                            }
                        });
                    });
                    this.readers.push(reader);
                });
            }
        );
    }
}
