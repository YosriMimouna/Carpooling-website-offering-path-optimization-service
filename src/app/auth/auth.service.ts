import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData, AuthDataEdit } from './auth-data.model';
import { SubmitData } from './submit-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NotifComponent } from '../notifications/notif.component';
import { Time } from '@angular/common';



@Injectable({ providedIn: 'root'})
export class AuthService {

  private token: string;
  private isAuthenticated = false;
  private tokenTimer: any;
  private userId: string;
  private userEmail: string;
  private userName: string;
  private notif: number;
  private user: AuthData;
  private authStatusListener = new Subject<boolean>();
  private submitData: SubmitData;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {}

  getUserInfo(id: string): any {
    return this.http
    .get<{_id: string; name:string; email:string; password:string; notif: Number; Type: string }>(
        'http://localhost:3000/api/user/' + id
      );
  }

  getSubmitInfo() {
    return this.submitData;
  }

  getToken() {
    return  this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getUserName() {
    return this.userName;
  }

  getNotif() {
    return this.notif;
  }

  getUser(id: string) {
    if (this.isAuthenticated === true) {
      return {...this.user};
    }
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(name: string, num: number, email: string, password: string, type: string, image: File) {
    const authData = new FormData();
    authData.append('name', name);
    authData.append('num', num.toString());
    authData.append('email', email);
    authData.append('password', password);
    authData.append('type', type);
    authData.append('image', image, name);
    this.http.post<{message: string, user: AuthData }>('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/']);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  notifParticipate(postId: string, userId: string, postCreator: string, inc: number) {
    const num = {id: postCreator, inc: inc, userId: userId, postId: postId};
    this.http
      .put('http://localhost:3000/api/user/notif/' + postCreator, num)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  notify() {
    this.dialog.open(NotifComponent, {data: {message: "testing notif"}});
  }

  updateUser(id: string, name: string, num: number, email: string, password: string, type: string) {
    const authData: AuthDataEdit = {id: id, name: name, num: num, email: email, password: password, type: type};
    this.http
      .put('http://localhost:3000/api/user/profile/' + id, authData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {name: "", num:0, email: email, password: password, type: "", imagePath: ""};
    this.http.post<{token: string, expiresIn: number, userId: string, userName: string, notif: number, email: string}>
    ('http://localhost:3000/api/user/login', authData)
      .subscribe(response =>{
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.userName = response.userName;
          this.userEmail = response.email;
          this.notif = response.notif;
          console.log(response.notif);
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setiing Timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
}
