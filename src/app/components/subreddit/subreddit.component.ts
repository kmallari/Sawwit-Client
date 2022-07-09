import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { SubredditsService } from 'src/app/services/subreddits.service';
import { ActivatedRoute } from '@angular/router';
import { Subreddit } from 'src/app/models/subreddit.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-subreddit',
  templateUrl: './subreddit.component.html',
  styleUrls: ['./subreddit.component.css'],
})
export class SubredditComponent implements OnInit {
  posts: Post[] = [];
  subredditName: string;
  subreddit?: Subreddit; // NEED TO PASS THIS INTO SUBMIT -> SEARCH
  isLogin: boolean = this._auth.isLogin;

  constructor(
    private postsService: PostsService,
    private subredditsService: SubredditsService,
    private route: ActivatedRoute,
    private _auth: AuthService
  ) {
    this.subredditName = String(this.route.snapshot.paramMap.get('subreddit'));
  }

  ngOnInit(): void {
    this.getSubredditPosts();
    this.getSubredditInfo();
  }

  getSubredditPosts = () => {
    this.postsService
      .getSubredditPosts(this.subredditName)
      .subscribe((posts) => {
        this.posts = posts;
      });
  };

  getSubredditInfo = () => {
    this.subredditsService
      .getSubredditInfo(this.subredditName)
      .subscribe((res: Subreddit) => {
        this.subreddit = res;
      });
  };
}
