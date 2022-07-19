import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor(
    private _chatService: ChatService,
    private _usersService: UsersService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this._chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    });
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
  }

  // FOR TESTING
  newMessage: string = '';
  messageList: string[] = [];
  // END OF FOR TESTING

  searchedUsers: User[] = [];
  private searchTerms = new Subject<string>();
  usersToMessage: User[] = []; // probably change this
  loggedInUser?: User = this._auth.loggedInUser;
  usersInGroup: User[] = this.loggedInUser ? [this.loggedInUser] : [];
  roomIdInput: string = '';

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getSearched(term: string): void {
    console.log('HELP');
    if (term) {
      this._usersService.searchUser(term).subscribe((users) => {
        this.searchedUsers = users;
      });
    }
  }

  sendMessage = () => {
    console.log(
      '🚀 ~ file: feed-container.component.ts ~ line 71 ~ FeedContainerComponent ~ sendMessage ~ this.newMessage',
      this.newMessage
    );
    this._chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  };

  addToUsersToMessage(user: User) {
    this.usersToMessage.push(user);
    console.log(this.usersToMessage);
  }

  addToGroup(user: User) {
    this.usersInGroup.push(user);
  }

  createRoom() {
    console.log('Hello?');
    this._chatService.createRoom(this.usersInGroup).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  joinRoom() {
    this._chatService.joinRoom(this.roomIdInput);
  }
}
