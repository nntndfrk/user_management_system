import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {AlertsComponent} from './components/alerts/alerts.component';
import {ClarityModule} from '@clr/angular';
import {SearchComponent} from './components/search/search.component';
import {FormsModule} from '@angular/forms';
import {PaginatorComponent} from './components/paginator/paginator.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule
  ],
  declarations: [
    SpinnerComponent,
    AlertsComponent,
    SearchComponent,
    PaginatorComponent,
  ],
  exports: [
    SpinnerComponent,
    AlertsComponent,
    SearchComponent,
    PaginatorComponent,
  ],
})
export class SharedModule {
}
