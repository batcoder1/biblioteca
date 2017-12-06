import { USERS } from './../../shared/constants';
import { Component } from '@angular/core';
import { BookService } from './../../services/book.service';
import { Book } from '../../shared/model';
import { OnInit } from '@angular/core';
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
    users = USERS;
    book: Book;
    estado = 'Lectores';
    constructor(private bookService: BookService) {
    }

    ngOnInit() {
        this.bookService.getBooks()
            .subscribe(result => {
                this.books = result;
            }
        );
    }
}