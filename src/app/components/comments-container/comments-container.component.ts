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
    this.getParentComments();
    // after nito, this.comments = array
  }

  addComments(comments: Comment[], parentId: string): void {
    const parentIndex = this.comments.findIndex(
      (comment) => comment.id === parentId
    );
    this.comments.splice(parentIndex + 1, 0, ...comments);
  }

  getParentComments(): void {
    this.commentsService
      .getParentComments(this.postId)
      .subscribe((comments) => {
        this.comments = comments;

        // changes the isChildrenRevealed attribute of a comment to true if
        // the children have been revealed

        const parentCommentsIds = new Set();
        let parentId = '';
        
        for (let i = 0; i < this.comments.length; i++) {
          parentId = this.comments[i].parentId;
          parentCommentsIds.add(parentId);
        }
        for (let i = 0; i < this.comments.length; i++) {
          let id = this.comments[i].id;
          if (parentCommentsIds.has(id)) {
            this.comments[i].isChildrenRevealed = true;
          }
        }

      });
  }

  getNextComments(args: {
    postId: string;
    parentId: string;
    isFirstRun: boolean;
  }): void {
    // yung parent na kinukuhanan ng subcoments, pwedeng imutate para yung revealChildren = true
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
