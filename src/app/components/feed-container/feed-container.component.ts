import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-feed-container',
  templateUrl: './feed-container.component.html',
  styleUrls: ['./feed-container.component.css'],
})
export class FeedContainerComponent implements OnInit {
  posts: Post[] = [];
  isLogin: boolean = false;
  constructor(private postsService: PostsService, private _auth: AuthService) {}
  ngOnInit(): void {
    this.getAllPosts();
    this.isUserLogin();
  }

  getAllPosts(): void {
    this.postsService.getAllPosts().subscribe((posts) => {
      this.posts = posts;
      // console.log('THIS POSTS', this.posts);
    });
  }

  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }
}
