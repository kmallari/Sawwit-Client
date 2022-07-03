import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
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
  author?: User;
  revealChildren: boolean = false;
  indentations: number[] = [];
  showReplyBox: boolean = false;

  constructor(private _usersService: UsersService) {}

  getTimeAgo(date: number): string {
    return moment(date).fromNow();
  }

  getNextComments(postId: string, parentId: string): void {
    this.revealChildren = true;
    this.onGetNextComments.emit({ postId, parentId });
  }

  getPaddingLeft(): number {
    if (this.comment) {
      return this.comment.level * 1.2;
    } else {
      return 0;
    }
  }

  getUserInfo(userId: string) {
    this._usersService.getUserInfo(userId).subscribe((user) => {
      this.author = user;
    });
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
    if (this.comment) this.getUserInfo(this.comment.userId);
    if (this.comment)
      this.indentations = Array(this.comment.level)
        .fill(0)
        .map((x, i) => i);
  }
}
