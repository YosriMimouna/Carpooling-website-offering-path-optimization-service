import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/posts/post.model';
import { PostService } from 'src/app/posts/posts.service';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';

export interface Type {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {


  types: Type[] = [
    {value: 'Driver', viewValue: 'Driver'},
    {value: 'Passenger', viewValue: 'Passenger'},
    {value: 'Both', viewValue: 'Both'}
  ];

  isLoading = false;
  private authStatusSub: Subscription;

  posts: Post[] = [];

  isSearch = false;
  currentUserId: string;
  totalPosts = 0;
  postsPerPage = 5;
  currentPage = 1;
  userIsAuthenticated = false;
  userId: string;
  userName: string;
  pageSizeOptions = [1, 2, 5, 10];
  private postsSub: Subscription;

  constructor(public authService: AuthService, public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.currentUserId = this.authService.getUserId();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.userId = paramMap.get('userId');
      }
    });
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus  => {
      this.isLoading = false;
    });
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.userName = this.authService.getUserName();
    this.userId = this.authService.getUserId();
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((postData: { posts: Post[], postCount: number}) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
  }


  filterItemsOfType(id: string) {
    return this.posts.filter(post => post.creator == id);
  }

  onSave(form: NgForm) {
    if ( form.invalid ) {
      return;
    }
    this.isLoading = true;
    this.authService.updateUser(this.currentUserId, form.value.name, form.value.num, form.value.email, form.value.password, form.value.type);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
