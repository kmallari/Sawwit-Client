import { Component, OnInit, Input, Output } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { CommentsService } from '../../services/comments.service';
@Component({
  selector: 'app-comments-container',
  templateUrl: './comments-container.component.html',
  styleUrls: ['./comments-container.component.css'],
})
export class CommentsContainerComponent implements OnInit {
  comments: Comment[] = [];
  @Input() postId: string = '';

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.getNextComments({ postId: this.postId, parentId: this.postId });
  }

  getNextComments(args: { postId: string; parentId: string }): void {
    this.commentsService
      .getNextComments(args.postId, args.parentId)
      .subscribe((comments) => {
        const parentIndex = this.comments.findIndex(
          (comment) => comment.id === args.parentId
        );
        this.comments.splice(parentIndex + 1, 0, ...comments);
      });
  }

  createComment(comment: Comment): void {
    if (comment) {
      this.commentsService
        .createComment(
          comment.userId,
          comment.username,
          comment.parentId,
          comment.body,
          comment.postId,
          comment.level
        )
        .subscribe((comment) => {
          console.log(comment);
        });
    }
  }
}
