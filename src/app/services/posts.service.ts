import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, RegisteredUser, LoginUser } from '../models/user.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private url = 'http://localhost:8080/posts';
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

  getAllPosts(): Observable<any> {
    return this.http.get<Post>(this.url).pipe(
      tap((_) => {
        console.log(_);
      }),
      catchError(this.handleError<any>('getAllPosts'))
    );
  }

  createPost(
    title: string,
    content: string,
    userId: string,
    username: string,
    subredditId: string,
    subreddit: string
  ): Observable<any> {
    return this.http
      .post<Post>(
        this.url + '/submit',
        {
          title: title,
          body: content,
          userId: userId,
          username: username,
          subredditId: subredditId,
          subreddit: subreddit,
        },
        this.httpOptions
      )
      .pipe(
        tap((_) => {
          console.log(_);
        }),
        catchError(this.handleError<any>('createPost'))
      );
  }

  getPost(id: string): Observable<any> {
    return this.http
      .get<Post>(this.url + '/' + id)
      .pipe(
        tap((_) => {
          console.log(_);
        }),
        catchError(this.handleError<any>('getPost'))
      );
  }
  
}
