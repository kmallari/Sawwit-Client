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

  addComments(comments: Comment[], parentId: string) {
    const parentIndex = this.comments.findIndex(
      (comment) => comment.id === parentId
    );
    this.comments.splice(parentIndex + 1, 0, ...comments);
  }

  getNextComments(args: { postId: string; parentId: string }): void {
    this.commentsService
      .getNextComments(args.postId, args.parentId)
      .subscribe((comments) => {
        this.addComments(comments, args.parentId);
      });
  }

  createComment(args: {
    userId: string;
    username: string;
    parentId: string;
    content: string;
    postId: string;
    parentLevel: number;
  }): void {
    console.log(
      args.userId,
      args.username,
      args.parentId,
      args.content,
      args.postId,
      args.parentLevel
    );

    if (
      args.userId &&
      args.username &&
      args.parentId &&
      args.content &&
      args.postId &&
      args.parentLevel !== undefined
    ) {
      this.commentsService
        .createComment(
          args.userId,
          args.username,
          args.parentId,
          args.content,
          args.postId,
          args.parentLevel
        )
        .subscribe((comment) => {
          console.log(comment);
          this.addComments([comment], args.parentId);
        });
    }
  }
}
