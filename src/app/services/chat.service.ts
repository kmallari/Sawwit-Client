import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Message } from '../models/message.model';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket, private http: HttpClient) {}

  private handleError<T>(error: any) {
    return throwError(() => error);
  }

  message$: BehaviorSubject<Message> = new BehaviorSubject({
    id: '',
    senderId: '',
    senderUsername: '',
    senderProfilePicture: '',
    roomId: '',
    message: '',
    createdAt: 0,
  });
  private url = 'http://localhost:8080/chat';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  // sendMessage(message: string) {
  //   console.log('Message being sent: ', message);
  //   this.socket.emit('message', message);
  // }

  getRoomMessages = (roomId: string, start: number, limit: number) => {
    return this.http
      .get(`${this.url}/messages/${roomId}?start=${start}&limit=${limit}`)
      .pipe(catchError(this.handleError));
  };

  sendMessage = (user: User, roomId: string, message: string) => {
    this.socket.emit('sendMessage', user, roomId, message);
  };

  getNewMessage = () => {
    console.log('GETTING NEW MESSAGE');

    this.socket.on('receiveMessage', (message: Message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  getRoomsUserIsIn = (userId: string) => {
    return this.http
      .get(`${this.url}/rooms/${userId}?start=0&limit=10`)
      .pipe(catchError(this.handleError));
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

  joinRoom = (userId: string, roomId: string) => {
    this.socket.emit('joinRoom', userId, roomId);
  };
}
