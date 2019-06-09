import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SubmitData } from 'src/app/auth/submit-data.model';
import { userCard } from '../userCard.model';
import { PostService } from '../posts.service';
import { Observable, Subscription } from 'rxjs';
import { userInfo } from './userInfo.model';
import { infoCard } from './infoCard.model';

@Component({
  templateUrl: './passenger-card.component.html',
  styleUrls: ['./passenger-card.component.css']
})
export class PassengerCardComponent implements OnInit{
  submittedData: SubmitData;
  name: string;
  UserCard: Subscription;
  currentUserCard: userCard;
  userInfo: Subscription;
  currentUserInfo: userInfo;
  cardInf: infoCard;

  constructor(private authService: AuthService, private postService: PostService) {}

  ngOnInit() {
    console.log(name);
    this.UserCard = this.postService.getUserCard(this.authService.getUserId()).subscribe(usercard1 => {
      this.currentUserCard = usercard1;
    });
    this.userInfo = this.authService.getUserInfo(this.authService.getUserId()).subscribe(userInfo1 => {
      this.currentUserInfo = userInfo1;
    });
    /*this.cardInf.date = this.currentUserCard.date;
    this.cardInf.dep = this.currentUserCard.dep;
    this.cardInf.des = this.currentUserCard.des;
    this.cardInf.dephour = this.currentUserCard.dephour
    this.cardInf.arrhour = this.
    this.cardInf.
    this.cardInf.*/

  }

  setSubmittedData() {
    this.submittedData = this.authService.getSubmitInfo();
  }
}
