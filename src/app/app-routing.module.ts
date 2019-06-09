import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './auth/Profile/profile.component';
import { PostSearchComponent } from './search/search.component';
import { OptMapComponent } from './opt-map/opt-map.component';
import { PassengerFormComponent } from './posts/passenger-form/passenger-form.component';
import { PassengerCardComponent } from './posts/passenger-card/passenger-card.component';
import { DriverFormComponent } from './posts/driver-form/driver-form.component';
import { DriverCardComponent } from './posts/driver-card/driver-card.component';
import { PostOffersComponent } from './posts/post-offers/post-offers.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'editUser/:userId', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'search', component: PostSearchComponent },
  { path: 'notif/:userId', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'optMap', component: OptMapComponent, canActivate: [AuthGuard] },
  { path: 'passengerForm', component: PassengerFormComponent, canActivate: [AuthGuard] },
  { path: 'passengerCard', component: PassengerCardComponent, canActivate: [AuthGuard] },
  { path: 'driverForm', component: DriverFormComponent, canActivate: [AuthGuard] },
  { path: 'driverCard', component: DriverCardComponent, canActivate: [AuthGuard] },
  { path: 'userCard/:userId', component: PassengerCardComponent, canActivate: [AuthGuard] },
  { path: 'offers', component: PostOffersComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
