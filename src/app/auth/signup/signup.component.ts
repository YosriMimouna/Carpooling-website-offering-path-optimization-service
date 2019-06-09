import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { mimeType } from './mime-type.validator';

export interface Type {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  types: Type[] = [
    {value: 'Driver', viewValue: 'Driver'},
    {value: 'Passenger', viewValue: 'Passenger'},
    {value: 'Both', viewValue: 'Both'}
  ];

  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private authStatusSub: Subscription;
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus  => {
      this.isLoading = false;
    });
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
      num: new FormControl(null),
      email: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required]}),
      type: new FormControl(null),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }

  onSignup() {
    if ( this.form.invalid ) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(
      this.form.value.name,
      this.form.value.num,
      this.form.value.email,
      this.form.value.password,
      this.form.value.type,
      this.form.value.image);
  }

  onImagePicked(event: Event, form: NgForm) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      (this.imagePreview as string | ArrayBuffer) = reader.result;
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
