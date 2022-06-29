import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Subreddit } from 'src/app/models/subreddit.model';
import { SubredditsService } from 'src/app/services/subreddits.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  subredditInfo: Subreddit | null = null;
  @Input() postData: Post | null = null;
  constructor(private subredditsService: SubredditsService) {}

  ngOnInit(): void {
    if (this.postData) {
      this.getSubredditInfo(this.postData.subredditId);
    }
  }

  getSubredditInfo(id: string): void {
    this.subredditsService.getSubredditInfo(id).subscribe((data) => {
      this.subredditInfo = data; 
      console.log("INFORMATION", this.getSubredditInfo)
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
