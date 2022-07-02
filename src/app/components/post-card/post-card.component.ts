import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Subreddit } from 'src/app/models/subreddit.model';
import { SubredditsService } from 'src/app/services/subreddits.service';
import * as moment from 'moment';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  subredditInfo: Subreddit | null = null;
  @Input() postData: Post | null = null;
  @Input() revealFullContent: boolean = false;
  constructor(private subredditsService: SubredditsService) {}

  ngOnInit(): void {
    if (this.postData) {
      this.getSubredditInfo(this.postData.subreddit);
    }
  }

  getSubredditInfo(id: string): void {
    this.subredditsService.getSubredditInfo(id).subscribe((data) => {
      this.subredditInfo = data;
      // console.log('INFORMATION', this.subredditInfo);
    });
  }

  getTimeAgo(date: number): string {
    return moment(date).fromNow();
  }
}
