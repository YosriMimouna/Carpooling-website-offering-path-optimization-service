import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { ProfileComponent } from './auth/Profile/profile.component';
import { PostSearchComponent } from './search/search.component';
import { NotifComponent } from './notifications/notif.component';
import { OptimizationComponent } from './optimization application/optimization.component';
import { OptMapComponent } from './opt-map/opt-map.component';
import { PassengerFormComponent } from './posts/passenger-form/passenger-form.component';
import { PassengerCardComponent } from './posts/passenger-card/passenger-card.component';
import { DriverFormComponent } from './posts/driver-form/driver-form.component';
import { DriverCardComponent } from './posts/driver-card/driver-card.component';
import { PostOffersComponent } from './posts/post-offers/post-offers.component';

@NgModule({
  declarations: [
    NotifComponent,
    LoginComponent,
    AppComponent,
    PostCreateComponent,
    PostListComponent,
    SignupComponent,
    ProfileComponent,
    HeaderComponent,
    ErrorComponent,
    PostSearchComponent,
    OptimizationComponent,
    OptMapComponent,
    PassengerFormComponent,
    PassengerCardComponent,
    DriverFormComponent,
    DriverCardComponent,
    PostOffersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularMaterialModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, NotifComponent]
})
export class AppModule { }
