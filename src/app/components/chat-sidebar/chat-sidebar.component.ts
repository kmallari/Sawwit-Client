import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../../models/room.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.css'],
})
export class ChatSidebarComponent implements OnInit {
  constructor(private _auth: AuthService, private _chatService: ChatService) {}

  ngOnInit(): void {
    this.getRoomsUserIsIn();
  }

  roomsUserIsIn: Room[] = [];
  loggedInUser?: User = this._auth.loggedInUser;

  getRoomsUserIsIn() {
    if (this.loggedInUser) {
      this._chatService.getRoomsUserIsIn(this.loggedInUser.id).subscribe(
        (res: any) => {
          this.roomsUserIsIn = res.data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
