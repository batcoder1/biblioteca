import { ModalModule } from 'ngx-bootstrap';
import { BookService } from './services/book.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BootstrapModalModule,
    ModalModule.forRoot()
  ],
  declarations: [
    AppComponent, BookComponent
  ],
  entryComponents: [
  ],
  providers: [ BookService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
