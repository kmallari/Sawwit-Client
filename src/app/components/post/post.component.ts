import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Subreddit } from 'src/app/models/subreddit.model';
import { SubredditsService } from 'src/app/services/subreddits.service';
import { PostsService } from 'src/app/services/posts.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  subredditInfo: Subreddit | null = null;
  postData: Post | null = null;
  constructor(
    private subredditsService: SubredditsService,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const postId = String(this.route.snapshot.paramMap.get('postId'));
    this.getPostInfo(postId);
  }

  getPostInfo(id: string): void {
    this.postsService.getPost(id).subscribe((data) => {
      this.postData = data;
      console.log(this.postData);
    });
  }

  findRelativeTime(time: number): string {
    const timeDiff = Date.now() - time;
    if (timeDiff < 60000) {
      return 'just now';
    } else if (timeDiff < 3600000) {
      return Math.floor(timeDiff / 60000) + ' minutes ago';
    } else if (timeDiff < 86400000) {
      return Math.floor(timeDiff / 3600000) + ' hours ago';
    } else if (timeDiff < 604800000) {
      return Math.floor(timeDiff / 86400000) + ' days ago';
    } else if (timeDiff < 2419200000) {
      return Math.floor(timeDiff / 604800000) + ' weeks ago';
    } else {
      return Math.floor(timeDiff / 2419200000) + ' months ago';
    }
  }
}
