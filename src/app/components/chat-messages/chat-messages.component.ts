import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
})
export class ChatMessagesComponent implements OnInit {
  constructor(
    private _chatService: ChatService,
    private _route: ActivatedRoute,
    private _auth: AuthService
  ) {
    this.roomId = this._route.snapshot.params['roomId'];
  }

  ngOnInit(): void {
    this.getMessages();
    this._chatService.getNewMessage().subscribe((messageInfo: Message) => {
      this.roomMessages.push(messageInfo);
      console.log(
        '🚀 ~ file: chat-messages.component.ts ~ line 28 ~ ChatMessagesComponent ~ this._chatService.getNewMessage ~ this.roomMessages',
        this.roomMessages
      );
    });
  }

  newMessage: string = '';
  roomMessages!: Message[];
  roomId: string;
  loggedInUser?: User = this._auth.loggedInUser;

  getMessages = () => {
    this._chatService
      .getRoomMessages(this.roomId, 0, 25)
      .subscribe((data: any) => {
        this.roomMessages = data.data;
      });
  };

  sendMessage = (roomId: string) => {
    // in the future, we could probably get room id through url params
    if (this.loggedInUser) {
      this._chatService.sendMessage(
        this.loggedInUser,
        this.roomId,
        this.newMessage
      );
      this.newMessage = '';
    }
  };
}
