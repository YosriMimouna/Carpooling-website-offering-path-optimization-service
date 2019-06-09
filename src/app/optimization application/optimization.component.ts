import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../posts/post.model';
import { Subscription } from 'rxjs';
import { PostService } from '../posts/posts.service';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';

export interface State {
  value: string;
  viewValue: string;
}

export interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-opt',
  templateUrl: './optimization.component.html',
  styleUrls: ['./optimization.component.css']
})
export class OptimizationComponent implements OnInit, OnDestroy {
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
  posts: Post[] = [];
  isLoading = false;
  isSearch = false;
  totalPosts = 0;
  postsPerPage = 5;
  currentPage = 1;
  userIsAuthenticated = false;
  userId: string;
  userName: string;
  pageSizeOptions = [1, 2, 5, 10];
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public postService: PostService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
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

  search(form: NgForm) {
    console.log("ok!");
    this.isSearch = true;
    this.postService.showMap(form.value.dep, form.value.des, form.value.date, form.value.dephour, form.value.arrhour, form.value.capacity);
  }

  getIsSearch() {
    return this.isSearch;
  }

  setIsSearch(search: boolean) {
   this.isSearch = search;
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
