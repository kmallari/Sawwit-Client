import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.model';
import { Subreddit } from 'src/app/models/subreddit.model';
import { SubredditsService } from 'src/app/services/subreddits.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-feed-container',
  templateUrl: './feed-container.component.html',
  styleUrls: ['./feed-container.component.css'],
})
export class FeedContainerComponent implements OnInit {
  constructor(
    private postsService: PostsService,
    private _subredditsService: SubredditsService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllPosts();
    this.getRecentSubreddits();
  }

  posts: Post[] = [];
  isLogin: boolean = this._auth.isLogin;
  recentSubreddits: Subreddit[] = [];

  getAllPosts(): void {
    this.postsService.getAllPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  getRecentSubreddits(): void {
    this._subredditsService.getRecentSubreddits(10).subscribe((subreddits) => {
      this.recentSubreddits = subreddits;
    });
  }
}
