import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, RegisteredUser, LoginUser } from '../models/user.model';
import { SubredditsService } from './subreddits.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { Subreddit } from '../models/subreddit.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private url = 'http://localhost:8080/posts';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private subredditsService: SubredditsService
  ) {}
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

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post>(this.url).pipe(
      tap((_) => {
        // console.log(_);
      }),
      catchError(this.handleError<any>('getAllPosts'))
    );
  }

  getSubredditPosts(subredditName: string): Observable<Post[]> {
    // is this legal??
    return this.http
      .get<Subreddit>('http://localhost:8080/subreddits/' + subredditName)
      .pipe(
        switchMap((subreddit) => {
          const subredditName = subreddit.name;
          return this.http
            .get<Post[]>(this.url + '/subreddit/' + subredditName)
            .pipe(
              tap((_) => {
                // console.log(_);
              }),
              catchError(this.handleError<any>('getSubredditPosts'))
            );
        })
      );
  }

  getUserPosts(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.url + '/user/' + userId).pipe(
      tap((_) => {
        // console.log(_);
      }),
      catchError(this.handleError<any>('getUserPosts'))
    );
  }

  createPost(
    title: string,
    content: string,
    userId: string,
    username: string,
    subreddit: string
  ): Observable<Post> {
    return this.http
      .post<Post>(
        this.url + '/submit',
        {
          title: title,
          body: content,
          userId: userId,
          username: username,
          subreddit: subreddit,
        },
        this.httpOptions
      )
      .pipe(
        tap((_) => {
          // console.log(_);
        }),
        catchError(this.handleError<any>('createPost'))
      );
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(this.url + '/' + id).pipe(
      tap((_) => {
        // console.log(_);
      }),
      catchError(this.handleError<any>('getPost'))
    );
  }
}
