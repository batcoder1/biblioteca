import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { Component } from '@angular/core/src/metadata/directives';

@Component({
    selector: 'app-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.less'],
})

export class ModalComponent {

    bookForm = new FormGroup ({
      title: new FormControl(),
      author: new FormControl(),
      type: new FormControl(),
      isbin: new FormControl(),
      gener: new FormControl(),
      date: new FormControl()
    });

    constructor(){}
}

