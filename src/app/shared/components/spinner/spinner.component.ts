import {Component} from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="clr-row clr-justify-content-center" style="margin-top: 3rem">
      <div class="clr-col-2">
        <span class="spinner spinner-lg">
      </span>
      </div>
    </div>
  `
})
export class SpinnerComponent {
}
