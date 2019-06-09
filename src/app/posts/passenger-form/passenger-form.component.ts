import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { PostService } from '../posts.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

export interface State {
  value: string;
  viewValue: string;
}

export interface Type {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './passenger-form.component.html',
  styleUrls: ['./passenger-form.component.css']
})
export class PassengerFormComponent implements OnInit {

  private authStatusSub: Subscription;

  types: Type[] = [
    {value: 'Driver', viewValue: 'Driver'},
    {value: 'Passenger', viewValue: 'Passenger'}
  ];

  states: State[] = [
    {value: '1 368665 101647', viewValue: 'Ariana'},
    {value: '2 367333 91844', viewValue: 'Beja'},
    {value: '3 367435 102320', viewValue: 'Ben Arous'},
    {value: '4 372768 98642', viewValue: 'Bizerte'},
    {value: '5 338881 100975', viewValue: 'Gabes'},
    {value: '6 344311 87757', viewValue: 'Gafsa'},
    {value: '7 365072 87757', viewValue: 'Jandouba'},
    {value: '8 356712 101005', viewValue: 'Kairouan'},
    {value: '9 351723 88308', viewValue: 'Kasserine'},
    {value: '10 337072 89715', viewValue: 'Kebili'},
    {value: '11 361680 87096', viewValue: 'Kef'},
    {value: '12 355024 110457', viewValue: 'Mahdia'},
    {value: '13 368093 100863', viewValue: 'Manouba'},
    {value: '14 333399 104959', viewValue: 'Mednine'},
    {value: '15 357643 108113', viewValue: 'Monastir'},
    {value: '16 364513 107357', viewValue: 'Nabeul'},
    {value: '17 358245 106346', viewValue: 'Sousse'},
    {value: '18 359903 92786', viewValue: 'Seliana'},
    {value: '19 347398 107600', viewValue: 'Sfax'},
    {value: '20 350354 94839', viewValue: 'Sidi Bouzid'},
    {value: '21 329211 104509', viewValue: 'Tataouine'},
    {value: '22 339185 81229', viewValue: 'Tozeur'},
    {value: '23 368065 101815', viewValue: 'Tunis'},
    {value: '24 364091 101423', viewValue: 'Zaghouan'}
  ];
  userIsAuthenticated: boolean;
  userId: string;
  private router: Router;

  constructor(public postService: PostService, private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
  }

  onSubmit(form: NgForm) {
    this.postService
    .createUserCard(form.value.date, form.value.dep, form.value.des,  form.value.dephour, form.value.arrhour, "0", this.authService.getUserId() );
  }
}
