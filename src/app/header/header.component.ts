import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  notif: number;
  userId: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.notif = this.authService.getNotif();
        this.userId = this.authService.getUserId();
      });
    console.log(this.notif);
  }

  notify() {
    this.authService.notify();
    this.authService.notifParticipate("", this.userId, this.authService.getUserId(), 0);
    this.notif = 0;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
