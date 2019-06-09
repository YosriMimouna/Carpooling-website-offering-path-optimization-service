import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { userCard } from './userCard.model';



@Injectable({providedIn: 'root'})
export class PostService {

  isSearch: boolean;
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number}>();
  private userCards: userCard[] = [];
  constructor(private http: HttpClient, private router: Router) {}


  getSmartSol() {
    this.http
    .get('http://localhost:3000/api/posts/optMap')
    .subscribe((CardData) => {
      this.userCards = Object.values(CardData);
      console.log(this.userCards);
    });
  }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{message: string, posts: any, maxPosts: number }>(
        'http://localhost:3000/api/posts' + queryParams
      )
      .pipe(
        map((postData) => {
          if (!this.isSearch) {
          return {
              posts: postData.posts.map(post => {
                return {
                  title: post.title,
                  content: post.content,
                  date: post.date,
                  dep: post.dep,
                  des: post.des,
                  id: post._id,
                  imagePath: post.imagePath,
                  creator: post.creator
                };
              }),
            maxPosts: postData.maxPosts
          };
        } else {
          this.isSearch = false;
          return {
            posts: this.posts,
            maxPosts: this.posts.length
          }
        }
      })
      )
      .subscribe((transformedPostData) => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getUserCard(id: string) {
    return this.http
    .get<{_id: string; date: string; dep: string; des: string; dephour: string; arrhour: string; capacity: string; creator: string }>(
        'http://localhost:3000/api/posts/userCard/' + id
      );
  }


  createUserCard(date: string, dep: string, des: string, dephour: string, arrhour: string, capacity: string, userId: string) {
    const UserCard: userCard = {date: date, dep: dep, des: des, dephour: "10:00", arrhour: "11:00", capacity: capacity, creator: userId};
    console.log(UserCard);
    this.http
    .post('http://localhost:3000/api/posts/userCard', UserCard).subscribe(res =>{
      console.log("success");
      }
    )
    if (capacity == "0") {
      this.router.navigate(['/passengerCard']);
    } else {
      this.router.navigate(['/driverCard']);
    }
  }

  arrayRemove(arr, value) {
      return arr.filter(function(ele) {
        return ele != value;
      });
  }

  setIsSearch(search: boolean) {
    this.isSearch = search;
  }

  getSearchedPosts(postsPerPage: number, currentPage: number, dep: string, des: string, date: string) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.isSearch = true;
    let dateRendred = date.toString().split(" ",4).join(" ");
    console.log(dateRendred);
    this.http
    .get<{message: string, posts: any, maxPosts: number }>(
      'http://localhost:3000/api/posts'
    )
    .pipe(
      map((postData) => {
        console.log(postData);
        let i;
        var arr = [];

        for (i=0; i<postData.posts.length; i++) {
          console.log(postData.posts[i].dep)
          if(dep != "") {
            if (postData.posts[i].dep !== dep) {
              postData.posts = this.arrayRemove(postData.posts, postData.posts[i]);
              i--;
            }
          }
          if(des != "") {
            if (postData.posts[i].des !== des) {
              postData.posts = this.arrayRemove(postData.posts, postData.posts[i]);
              i--;
            }
          }
          if(date != "") {
            if (postData.posts[i].date !== dateRendred) {
              postData.posts = this.arrayRemove(postData.posts, postData.posts[i]);
              i--;
            }
          }
        }
        return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                date: post.date,
                dep: post.dep,
                des: post.des,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator
              };
            }),
          maxPosts: postData.maxPosts
        };
    })
    )
    .subscribe((transformedPostData) => {
      this.posts = transformedPostData.posts;
      this.postsUpdated.next({
        posts: [...this.posts],
        postCount: transformedPostData.maxPosts
      });
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http
    .get<{_id: string; title: string; content: string; date: string; dep: string; des: string; dephour: string; arrhour: string; capacity: string; imagePath: string; creator: string }>(
        'http://localhost:3000/api/posts/' + id
      );
  }

  addPost(title: string, content: string, date: string, dep: string, des: string, dephour: string, arrhour: string, capacity: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('date', date);
    postData.append('dep', dep);
    postData.append('des', des);
    postData.append('dephour', dephour);
    postData.append('arrhour', arrhour);
    postData.append('capacity', capacity);
    postData.append('image', image, title);
    this.http
      .post<{message: string, post: Post }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }

  showMap(dep: string, des: string, date:string, dephour: string, arrhour: string, capacity: number) {
    this.router.navigate(['/optMap']);
  }

  updatePost(id: string, title: string, content: string, date: string, dep: string, des: string, dephour:string, arrhour: string, capacity: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof(image) === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('content', content);
      postData.append('title', title);
      postData.append('date', date);
      postData.append('dep', dep);
      postData.append('des', des);
      postData.append('dephour', dephour);
      postData.append('arrhour', arrhour);
      postData.append('capacity', capacity);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        date: date,
        dep: dep,
        des: des,
        dephour: dephour,
        arrhour: arrhour,
        capacity: capacity,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put('http://localhost:3000/api/posts/' + id, postData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.http
      .delete('http://localhost:3000/api/posts/' + postId);
  }
}
