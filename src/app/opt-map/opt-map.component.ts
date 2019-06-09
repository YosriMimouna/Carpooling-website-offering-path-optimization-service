import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PostService } from '../posts/posts.service';

@Component({
  templateUrl: './opt-map.component.html',
  styleUrls: ['./opt-map.component.css']
})
export class OptMapComponent implements OnInit {

  constructor(private authService: AuthService, private postService: PostService) {}

  ngOnInit() {
    this.postService.getSmartSol();
  }
}
