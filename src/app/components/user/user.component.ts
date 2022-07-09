import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private _auth: AuthService
  ) {}

  posts: Post[] = [];
  isLogin: boolean = this._auth.isLogin;
  loggedInUser?: User = this._auth.loggedInUser;
  userId = String(this.route.snapshot.paramMap.get('userId'));

  ngOnInit(): void {
    this.getUserPosts();
  }

  getUserPosts = () => {
    this.postsService.getUserPosts(this.userId).subscribe((posts) => {
      this.posts = posts;
      // console.log('THIS POSTS', this.posts);
    });
  };
}
