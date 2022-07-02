import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { SubredditsService } from 'src/app/services/subreddits.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-subreddit',
  templateUrl: './subreddit.component.html',
  styleUrls: ['./subreddit.component.css'],
})
export class SubredditComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postsService: PostsService,
    private subredditsService: SubredditsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getSubredditPosts();
  }

  getSubredditPosts = () => {
    const subredditName = String(this.route.snapshot.paramMap.get('subreddit'));
    this.postsService.getSubredditPosts(subredditName).subscribe((posts) => {
      this.posts = posts;
      // console.log('THIS POSTS', this.posts);
    });
  };
}
