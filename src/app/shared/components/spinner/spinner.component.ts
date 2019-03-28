import {Component} from '@angular/core';
import {SpinnerService} from '../../../core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `<span class="spinner spinner-md spinner-inverse" *ngIf="spinner$ | async"></span>`
})
export class SpinnerComponent {
  constructor(private service: SpinnerService) {
  }

  spinner$ = this.service.getSpinner();
}
