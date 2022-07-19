import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket, private http: HttpClient) {}

  private handleError<T>(error: any) {
    return throwError(() => error);
  }

  message$: BehaviorSubject<string> = new BehaviorSubject('');
  private url = 'http://localhost:8080/chat';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  // sendMessage(message: string) {
  //   console.log('Message being sent: ', message);
  //   this.socket.emit('message', message);
  // }

  sendMessage = (message: string) => {
    this.socket.emit('sendMessage', 'URFaZhdCy2MBh7OAc9YeT', message);
  };

  getNewMessage = () => {
    console.log('GETTING NEW MESSAGE');

    this.socket.on('receiveMessage', (message: string) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  createRoom = (users: User[]): Observable<any> => {
    console.log('this runs??');
    return this.http
      .post<any>(
        this.url,
        {
          users,
        },
        this.httpOptions
      )
      .pipe(
        tap((_) => {
          console.log('TAP', _);
        }),
        catchError(this.handleError)
      );
  };

  joinRoom = (roomId: string) => {
    this.socket.emit('joinRoom', roomId);
  };
}
