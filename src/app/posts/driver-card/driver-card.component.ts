import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SubmitData } from 'src/app/auth/submit-data.model';
import { Subscription } from 'rxjs';
import { userInfo } from '../passenger-card/userInfo.model';
import { PostService } from '../posts.service';
import { userCard } from '../userCard.model';

@Component({
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.css']
})
export class DriverCardComponent implements OnInit{
  submittedData: SubmitData;
  name: string;
  UserCard: Subscription;
  currentUserCard: userCard;
  userInfo: Subscription;
  currentUserInfo: userInfo;

  constructor(private authService: AuthService, private postService: PostService) {}

  ngOnInit() {
    console.log(name);
    this.UserCard = this.postService.getUserCard(this.authService.getUserId()).subscribe(usercard1 => {
      this.currentUserCard = usercard1;
    });
    this.userInfo = this.authService.getUserInfo(this.authService.getUserId()).subscribe(userInfo1 => {
      this.currentUserInfo = userInfo1;
    });
  }

  setSubmittedData() {
    this.submittedData = this.authService.getSubmitInfo();
  }

}
