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
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css']
})
export class DriverFormComponent implements OnInit {

  private authStatusSub: Subscription;

  types: Type[] = [
    {value: 'Driver', viewValue: 'Driver'},
    {value: 'Passenger', viewValue: 'Passenger'}
  ];

  states: State[] = [
    {value: 'Ariana', viewValue: 'Ariana'},
    {value: 'Beja', viewValue: 'Beja'},
    {value: 'Ben Arous', viewValue: 'Ben Arous'},
    {value: 'Bizerte', viewValue: 'Bizerte'},
    {value: 'Gabes', viewValue: 'Gabes'},
    {value: 'Gafsa', viewValue: 'Gafsa'},
    {value: 'Jandouba', viewValue: 'Jandouba'},
    {value: 'Kairouan', viewValue: 'Kairouan'},
    {value: 'Kasserine', viewValue: 'Kasserine'},
    {value: 'Kebili', viewValue: 'Kebili'},
    {value: 'Kef', viewValue: 'Kef'},
    {value: 'Mahdia', viewValue: 'Mahdia'},
    {value: 'Manouba', viewValue: 'Manouba'},
    {value: 'Mednine', viewValue: 'Mednine'},
    {value: 'Monastir', viewValue: 'Monastir'},
    {value: 'Nabeul', viewValue: 'Nabeul'},
    {value: 'Sousse', viewValue: 'Sousse'},
    {value: 'Seliana', viewValue: 'Seliana'},
    {value: 'Sfax', viewValue: 'Sfax'},
    {value: 'Sidi Bouzid', viewValue: 'Sidi Bouzid'},
    {value: 'Tataouine', viewValue: 'Tataouine'},
    {value: 'Tozeur', viewValue: 'Tozeur'},
    {value: 'Tunis', viewValue: 'Tunis'},
    {value: 'Zaghouan', viewValue: 'Zaghouan'}
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
    .createUserCard(form.value.date, form.value.dep, form.value.des,  form.value.dephour, form.value.arrhour, form.value.capacity, this.authService.getUserId() );
  }
}
