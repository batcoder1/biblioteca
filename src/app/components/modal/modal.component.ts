import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Input } from '@angular/core';
 
@Component({
  selector: 'app-modal',
  template: `
  <div bsModal #childModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
 <div class="modal-dialog modal-sm">
   <div class="modal-content">
     <div class="modal-header">
       <h4 class="modal-title pull-left">{{title}}</h4>
       <button type="button" class="close pull-right" aria-label="Close" (click)="hideChildModal()">
         <span aria-hidden="true">&times;</span>
       </button>
     </div>
     <div class="modal-body">
       <ng-content select=".modal-body"> </ng-content>
     </div>

     <div class="modal-footer">
       <div class="pull-left">
         <button class="btn btn-default" (click)="hide()"> Cancel </button>
       </div>
     </div>
   </div>
 </div>
</div>
 `,
})
export class ModalComponent {
  @ViewChild('childModal') childModal: ModalDirective;
  @Input() title:string;
  showChildModal(): void {
    this.childModal.show();
  }
 
  hideChildModal(): void {
    this.childModal.hide();
  }
}