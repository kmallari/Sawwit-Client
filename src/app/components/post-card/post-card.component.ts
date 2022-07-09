import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  @Input() postData: Post | null = null;
  @Input() revealFullContent: boolean = false;
  user?: User = this._auth.loggedInUser;
  vote: number = 0;

  constructor(
    private _postsService: PostsService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {}

  getTimeAgo(date: number): string {
    return moment(date).fromNow();
  }

  votePost(event: Event, vote: number): void {
    event.stopPropagation();
    // if (this.vote === vote) {
    //   this.vote = 0;
    // } else {
    //   this.vote = vote;
    // }
    if (this.postData && this.user) {
      const postId = this.postData.id;
      const userId = this.user.id;
      this._postsService.votePost(postId, userId, vote).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
