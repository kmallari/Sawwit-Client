import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Room } from '../../models/room.model';
import { Message } from 'src/app/models/message.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor(
    private _chatService: ChatService,
    private _usersService: UsersService,
    private _auth: AuthService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.searchTerms
      .pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(500),
        // ignore new term if same as previous term
        distinctUntilChanged()
        // switchMap((term: string) => this.movieService.searchMovies(term))
      )
      .subscribe((term) => {
        this.getSearched(term);
      });

    this.roomId = this._route.snapshot.params['roomId'];
    if (this.roomId) {
      this.joinRoom(this.roomId);
    }
  }

  // FOR TESTING
  // messageList: string[] = [];
  // END OF FOR TESTING

  searchedUsers: User[] = [];
  private searchTerms = new Subject<string>();
  usersToMessage: User[] = []; // probably change this
  loggedInUser?: User = this._auth.loggedInUser;
  usersInGroup: User[] = this.loggedInUser ? [this.loggedInUser] : [];
  roomIdInput: string = '';
  roomsUserIsIn: Room[] = [];
  roomId: string = '';

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getSearched(term: string): void {
    if (term) {
      this._usersService.searchUser(term).subscribe((users) => {
        this.searchedUsers = users;
      });
    }
  }

  addToUsersToMessage(user: User) {
    this.usersToMessage.push(user);
  }

  addToGroup(user: User) {
    this.usersInGroup.push(user);
  }

  createRoom() {
    console.log('Hello?');
    this._chatService.createRoom(this.usersInGroup).subscribe(
      (res: any) => {
        // console.log(res);
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  joinRoom(roomToJoin: string) {
    if (this.loggedInUser)
      this._chatService.joinRoom(this.loggedInUser.id, roomToJoin);
  }
}
