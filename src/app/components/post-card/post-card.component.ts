import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import * as moment from 'moment';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  @Input() postData: Post | null = null;
  @Input() revealFullContent: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  getTimeAgo(date: number): string {
    return moment(date).fromNow();
  }
}
