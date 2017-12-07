import { GENRES } from './../../shared/constants';
import { Metadata } from './../../shared/model';
import { Component } from '@angular/core';
import { BookService } from './../../services/book.service';
import { Book, User } from '../../shared/model';
import { OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { USERS } from '../../shared/constants';
import { ModalDirective } from 'ngx-bootstrap/modal';
import 'dateformat/';


@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})

export class BookComponent implements OnInit {
    @ViewChild('childModal') childModal: ModalDirective;
    genres = GENRES;
    users = USERS;
    books: Book[] = [];
    new = false;
    book: Book;
    filterField= {title: '', author: '', isbin: '', genre: ''};
    bookForm: FormGroup;
    filterForm: FormGroup;
    userToAdd: User[] = [];
    isDisabledAuthorGenre = false;
    isDisabledTitleAuthorGenre = false;
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
            title: ['', Validators.required],
            author: ['', Validators.required],
            users: [],
            metadata: this.fb.group({
                type: 'T',
           
      isbin: '',
                genre: '',
                reserved: '',
                date: '1999-01-01'

            })
        });
        this.filterForm = new FormGroup({
            title: new FormControl({value: '', disable: this.isDisabledTitleAuthorGenre}),
            author: new FormControl({value: '', disable: this.isDisabledAuthorGenre || this.isDisabledTitleAuthorGenre}),
            isbin: new FormControl({value: ''}),
            genre: new FormControl({value: '', disable: this.isDisabledAuthorGenre }),
        });
    }
    editBook(book: Book) {
        this.loadBookInForm(book);
        this.childModal.show();
    }
    editedBook(book: Book) {
        const index = this.books.indexOf(book);
        this.books.splice(index, 1, book);
        this.closeModal();
    }
    deleteBook(book: Book) {
        const index = this.books.indexOf(book);
        this.books.splice(index, 1);
    }
    prepareSaveBook(): Book {
        const formModel = this.bookForm.value;

        const metadata: Metadata = {
            type: formModel.metadata.type as string,
            isbin: formModel.metadata.isbin as string,
            reserved: '',
            genre: formModel.metadata.genre as string,
            date: formModel.metadata.date as string,

        };
        const saveBook: Book = {
            title: formModel.title as string,
            author: formModel.author as string,
            users: this.userToAdd,
            metadata: metadata
        };
        return saveBook;
    }

    confirm() {
        const book = this.prepareSaveBook();
        console.log(this.books.indexOf(book));
        if (this.books.indexOf(book) === -1) {
            this.books = [...this.books, book];
            this.closeModal();
        } else {
            this.editedBook(book);
        }

    }
    addUserToLibro(event) {
        // if don exist in userToAdd array, lo  incluye
        if (this.userToAdd.indexOf(this.users[event.target.selectedIndex]) === -1) {
            this.userToAdd.push(this.users[event.target.selectedIndex]);
        }
    }

    deleteEnroll(u) {
        this.userToAdd.splice(this.userToAdd.indexOf(u));
    }
    closeModal() {
        this.userToAdd = [];
        this.bookForm.reset();
        this.childModal.hide();
    }
    loadBookInForm(book: Book) {
        book.metadata.date = book.metadata.date;
        this.bookForm.controls['title'].setValue(book.title);
        this.bookForm.controls['author'].setValue(book.author);
        this.bookForm.controls['metadata'].setValue(book.metadata);
        this.bookForm.controls['users'].setValue(book.users);
        this.userToAdd = book.users;
    }
    
    filter(event) {
        return event;

    }

}
