import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../models/comment.model';
import * as moment from 'moment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment | null = null;
  @Output() onGetNextComments: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  getTimeAgo(date: number): string {
    return moment(date).fromNow();
  }

  getNextComments(postId: string, parentId: string): void {
    this.onGetNextComments.emit({ postId, parentId });
  }

  getPaddingLeft(): number {
    if (this.comment) {
      return this.comment.level * 1.2;
    } else {
      return 0;
    }
  }
}
