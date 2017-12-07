import { Component, ViewChild } from '@angular/core';
import { BookComponent } from '../book/book.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
})

export class HomeComponent {
    @ViewChild('childModal') childModal: BookComponent;
    constructor() {}
}

