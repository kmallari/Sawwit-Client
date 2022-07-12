import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import * as moment from 'moment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private postsService: PostsService,
    private _usersService: UsersService,
    private route: ActivatedRoute,
    private _auth: AuthService
  ) {}

  posts: Post[] = [];
  isLogin: boolean = this._auth.isLogin;
  loggedInUser?: User = this._auth.loggedInUser;
  userInPage?: User;
  userId = String(this.route.snapshot.paramMap.get('userId'));

  ngOnInit(): void {
    console.log(this.userId);
    this.getUserPosts();
    this.getUserInfo();
  }

  getUserPosts = () => {
    this.postsService.getUserPosts(this.userId).subscribe((posts) => {
      this.posts = posts;
      // console.log('THIS POSTS', this.posts);
    });
  };

  getUserInfo = () => {
    this._usersService.getUserInfo(this.userId).subscribe((user) => {
      this.userInPage = user;
    });
  };

  getTimeAgo(date: number): string {
    return moment(date).fromNow();
  }

  getBalloonDay(date: number): string {
    return moment(date).format("MMMM Do, YYYY")
  }
}
