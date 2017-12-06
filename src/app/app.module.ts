import { ModalModule } from 'ngx-bootstrap';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouteModule } from './modules/root/route.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './services/book.service';
import { HomeComponent } from './components/home/home.component';
import { BookComponent } from './components/book/book.component';
import { UserComponent } from './components/user/user.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouteModule,
    ModalModule.forRoot()
  ],
  declarations: [ AppComponent,
    HomeComponent, BookComponent,
    UserComponent
  ],
  providers: [BookService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
