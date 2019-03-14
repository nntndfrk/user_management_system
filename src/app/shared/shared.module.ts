import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {AlertsComponent} from './components/alerts/alerts.component';
import {ClarityModule} from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule
  ],
  declarations: [
    SpinnerComponent,
    AlertsComponent,
  ],
  exports: [
    SpinnerComponent,
    AlertsComponent,
  ]
})
export class SharedModule {
}
