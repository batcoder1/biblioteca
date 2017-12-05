import { Metadata } from './../../shared/model';
import { Component } from '@angular/core';
import { BookService } from './../../services/book.service';
import { Book, User } from '../../shared/model';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})

export class BookComponent implements OnInit {
    @ViewChild('childModal') childModal: ModalDirective;
    books: Book[] = [];
    new = false;
    generos = [
        { id: 1, name: 'Novela' },
        { id: 2, name: 'Terror' },
        { id: 3, name: 'Infantil' },
        { id: 4, name: 'Poesía' },
        { id: 5, name: 'Aventura' }
    ];

    book: Book;
    bookForm: FormGroup;

    constructor(private bookService: BookService, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.bookService.getBooks()
            .subscribe(result => {
                this.books = result;
                console.log(result);
            }
        );
        this.createForm();
    }
    createForm() {
        this.bookForm = this.fb.group({
            title:  ['', Validators.required ],
            author: ['', Validators.required ],
            users: [],
            metadata: this.fb.group({
                type: 'T',
                isbin: '',
                genre: '',
                date: new Date()

            })
        });
    }
    editedBook() {
        const book = this.prepareSaveBook();
        const index = this.books.indexOf(book);
        this.books.splice(index, 1, book);
      }
    deleteBook(book: Book) {
        const index = this.books.indexOf(book);
        this.books.splice(index, 1);
    }
    prepareSaveBook(): Book {
        const formModel = this.bookForm.value;

        const metadata: Metadata = {
            type: formModel.type as string,
            isbin: formModel.isbin as string,
            reserved: '',
            genre: formModel.genre as string,
            date: formModel.date as Date,
        };
        const users: User[] = [];
        const saveBook: Book = {
            title: formModel.title as string,
            author: formModel.author as string,
            users: users,
            metadata: metadata
        };
        return saveBook;
    }

    confirm() {
        const book = this.prepareSaveBook();
        this.books = [...this.books, book];
    }

    showChildModal(): void {
        this.childModal.show();
    }

    hideChildModal(): void {
        this.childModal.hide();
    }
}
