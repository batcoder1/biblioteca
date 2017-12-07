import { ModalComponent } from './../../components/modal/modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  imports: [ModalModule.forRoot(), BrowserModule],
  declarations: [ModalComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  exports: []

})
export class MyModalModule {
}
