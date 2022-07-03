import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, RegisteredUser, LoginUser } from '../models/user.model';
import { SubredditsService } from './subreddits.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private url = 'http://localhost:8080/posts/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.

      // add error handling here

      return of(result as T);
    };
  }

  getPostComments(postId: string): Observable<Comment> {
    return this.http.get<Comment>(this.url + postId + '/comments').pipe(
      tap((_) => {
        // console.log(_);
      }),
      catchError(this.handleError<any>('getPostComments'))
    );
  }

  getNextComments(postId: string, parentId: string): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(
        this.url + postId + '/comments/next' + `?parentId=${parentId}`
      )
      .pipe(
        tap((_) => {
          // console.log(_);
        }),
        catchError(this.handleError<any>('getNextLevelComments'))
      );
  }

  createComment(
    userId: string,
    username: string,
    parentId: string,
    comment: string,
    postId: string,
    parentLevel: number
  ): Observable<Comment> {
    return this.http
      .post<Comment>(
        this.url + postId + '/comments?parentLevel=' + parentLevel,
        {
          userId: userId,
          username: username,
          parentId: parentId,
          comment: comment,
        },
        this.httpOptions
      )
      .pipe(
        tap((_) => {
          console.log('COMMENT TAP', _);
        }),
        catchError(this.handleError<Comment>('createComment'))
      );
  }
}
