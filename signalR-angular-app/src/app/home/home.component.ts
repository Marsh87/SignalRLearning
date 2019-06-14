import { Component, OnInit, NgZone } from '@angular/core';
import { ChatMessage } from '../models/chat-message';
import { Tab } from '../models/tab';
import { SignalRService } from '../service/signalR.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    chatMessage: ChatMessage;
    canSendMessage: boolean;
    tabs: Tab[];
    currentRoom: string;

  constructor(
    private signalrService: SignalRService,
    private ngZone: NgZone
  ) {
    this.subscribeToEvents();
    this.chatMessage = new ChatMessage();
    this.tabs = [];
    this.tabs.push(new Tab('Lobby', 'Welcome to lobby'));
    this.tabs.push(new Tab('SignalR', 'Welcome to SignalR Room'));
    this.currentRoom = 'Lobby';
  }

  sendMessage() {
    if (this.canSendMessage) {
      this.chatMessage.room = this.currentRoom;
      this.signalrService.sendChatMessage(this.chatMessage);
    }
  }

  OnRoomChange(room) {
    this.currentRoom = room;
  }

  private subscribeToEvents(): void {
    this.signalrService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
    });

    this.signalrService.messageReceived.subscribe((message: ChatMessage) => {
      this.ngZone.run(() => {
        this.chatMessage = new ChatMessage();
        const room = this.tabs.find(t => t.heading === message.room);
        if (room) {
          room.messageHistory.push(new ChatMessage(message.user, message.message, message.room));
        }
      });
    });
  }
}
