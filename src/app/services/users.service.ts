import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, RegisteredUser, LoginUser } from '../models/user.model';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = 'http://localhost:8080/users';
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

  register(
    email: string,
    username: string,
    password: string
  ): Observable<RegisteredUser> { // expected yung return ng server
    return this.http
      .post<RegisteredUser>( // tama yung type nito
        this.url + '/register',
        {
          email: email,
          username: username,
          password: password,
        },
        this.httpOptions
      )
      .pipe(
        tap((_) => {
          console.log('TAP', _);
        }),
        // if dito lang sa service yung error handling, mahirap itransfer sa ui yung error
        catchError(this.handleError<RegisteredUser>('register'))
      );
  }

  login(loginInfo: string, password: string): Observable<LoginUser> {
    return this.http
      .post<LoginUser>(
        this.url + '/login',
        { loginInfo: loginInfo, password: password },
        this.httpOptions
      )
      .pipe(
        tap((_) => {
          console.log('TAP', _);
        }),
        catchError(this.handleError<LoginUser>('login'))
      );
  }
}