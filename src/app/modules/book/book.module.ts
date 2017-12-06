import { BookService } from './../../services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  imports: [HttpClientModule,  ModalModule.forRoot()],
  declarations: [],
  providers: [ BookService],
  exports: [BookModule]

})
export class BookModule {
}