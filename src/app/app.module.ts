import { MyModalModule } from './components/modal/my-modal.module';
import { BookModule } from './components/book/book.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouteModule } from './modules/root/route.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './services/book.service';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouteModule,
    BookModule,
    ModalModule.forRoot(),
    MyModalModule
  ],
  declarations: [ AppComponent,
    HomeComponent,
    UserComponent
  ],
  providers: [BookService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
