import { BookComponent } from './../../components/book/book.component';
import { BookService } from './../../services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [HttpClientModule],
  declarations: [BookComponent],
  providers: [ BookService]
  
})
export class BookModule {
}