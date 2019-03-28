import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClarityModule} from '@clr/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './login/login.component';
import {MessagesService} from './core/services/messages.service';
import {AuthService} from './core/services/auth.service';
import {AuthGuard} from './core/guards/auth.guard';
import {SharedModule} from './shared/shared.module';
import {AboutComponent} from './about/about.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthInterceptor} from './core/services/auth-interceptor.service';
import {SearchComponent} from './search/search.component';
import {SpinnerService} from './core/services/spinner.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    AboutComponent,
    RegistrationComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
  ],
  providers: [
    MessagesService,
    SpinnerService,
    AuthService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
