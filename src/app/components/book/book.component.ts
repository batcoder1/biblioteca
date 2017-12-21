
import { GENRES } from './../../shared/constants';
import { Component } from '@angular/core';
import { BookService } from './../../services/book.service';
import { Book, User, Filter, Metadata } from '../../shared/model';
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
    filters: Filter= {title: '', author: '', isbin: '', genre: ''};
    bookForm: FormGroup;
    filterForm: FormGroup;
    userToAdd: User[] = [];
    search = false;
    formControl: FormControl;
    isDisabledAuthorGenre = false;
    genre = '';
    constructor(private bookService: BookService, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.bookService.getBooks()
            .subscribe(result => this.books = result);
        this.createForm();
        this.subcribeToFormChanges();
    }
    createForm() {
        this.bookForm = this.fb.group({
            title: ['', Validators.required],
            author: ['', Validators.required],
            users: [],
            metadata: this.fb.group({
                type: 'L',
                isbin: '',
                genre: '',
                reserved: '',
                date: '1999-01-01'

            })
        });
        this.filterForm = this.fb.group({
            title: [''],
            author: [''],
            genre: [''],
            isbin: ['']
        });
    }
    editBook(book: Book) {
        this.loadBookInForm(book);
        this.childModal.show();
    }
    loadBookInForm(book: Book) {
        book.metadata.date = book.metadata.date;
        book.metadata.genre = this.genres.filter(c => c === book.metadata.genre)[0];
        this.bookForm.controls['title'].setValue(book.title);
        this.bookForm.controls['author'].setValue(book.author);
        this.bookForm.controls['metadata'].setValue(book.metadata);
        this.bookForm.controls['users'].setValue(book.users);
        this.userToAdd = book.users;
    }
    deleteBook(book: Book) {
        const index = this.books.indexOf(book);
        this.books.splice(index, 1);
        this.books = [...this.books];
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
        const existe: Book[] = this.books.filter(b => b.metadata.isbin === book.metadata.isbin);
        if (existe.length === 0) {
            this.books = [...this.books, book];
            this.closeModal();
        } else {
            this.editedBook(book);
        }

    }
    editedBook(book: Book) {
        this.books.forEach(b => {
            if (b.metadata.isbin === book.metadata.isbin) {
                const index = this.books.indexOf(b);
                this.books.splice(index, 1, book);
                this.closeModal();
                this.books = [...this.books];
            }
        });
    }
    addUserToLibro(event) {
        // if it doent exist in userToAdd array then insert it
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

    subcribeToFormChanges() {
        const filterFormValueChanges$ = this.filterForm.valueChanges;
        filterFormValueChanges$.subscribe(filterChanges => {
            this.filters = Object.assign({}, filterChanges);
        });
    }

    deleteFilters() {
        this.filterForm.reset();
        this.filterForm.controls['title'].enable();
        this.filterForm.controls['author'].enable();
        this.filterForm.controls['genre'].enable();
        this.isDisabledAuthorGenre = false;
    }
    toggleSearch() {
        this.search = !this.search;
    }
    disableAuthorGenre() {
        this.filterForm.controls['author'].disable();
        this.filterForm.controls['genre'].disable();
        this.isDisabledAuthorGenre = true;

    }
    disableTitleAuthorGenre() {
        if (!this.isDisabledAuthorGenre) {
            this.filterForm.controls['title'].disable();
            this.filterForm.controls['author'].disable();
            this.filterForm.controls['genre'].disable();
        }

    }
    changeGenre() {
        this.bookForm.controls['metadata'].valueChanges.subscribe(metadata =>  {

         this.genre = metadata.genre;
        });
    }

}
