import { FilterPipe } from './filter.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BookComponent } from './../../components/book/book.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  imports: [ModalModule, BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [BookComponent, FilterPipe],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  exports: []

})
export class BookModule {
}


