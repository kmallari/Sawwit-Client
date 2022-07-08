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
  @Output() onCreateComment: EventEmitter<any> = new EventEmitter();
  // revealChildren: boolean = false;
  // kailangan if kukunin from cache yung data, true ito (if may children)
  // hindi naman server data ito
  // if kapag nag getnext comments

  // kunin lahat ng parent keys sa cache
  indentations: number[] = [];
  showReplyBox: boolean = false;

  constructor() {}

  getTimeAgo(date: number): string {
    return moment(date).fromNow();
  }

  getNextComments(postId: string, parentId: string, isFirstRun: boolean): void {
    // if (this.comment) {
    //   // DOES NOT WORK?? WHY??
    //   this.comment.isChildrenRevealed = true;
    // }
    if (this.comment) this.comment.isChildrenRevealed = true;
    this.onGetNextComments.emit({ postId, parentId, isFirstRun });
  }

  toggleReply(): void {
    this.showReplyBox = !this.showReplyBox;
  }

  onCreateNestedComment(event: Event) {
    this.onCreateComment.emit(event);
  }

  onClick(): void {
    if (this.comment) console.log('comment', this.comment);
  }

  ngOnInit(): void {
    if (this.comment) {
      this.indentations = Array(this.comment.level)
        .fill(0)
        .map((x, i) => i);
    }

    console.log(this.comment?.isChildrenRevealed);
  }
}
