import { Injectable, EventEmitter } from "@angular/core";
import { ChatMessage } from '../models/chat-message';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable()
export class SignalRService {
    
    messageReceived = new EventEmitter<ChatMessage>();
    connectionEstablished = new EventEmitter<Boolean>();

    private connectionIsEstablished = false;
    private _hubConnection:HubConnection;

    constructor(){
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }

    sendChatMessage(message:ChatMessage){
        this._hubConnection.invoke('SendMessage', message);
    }

    private createConnection() {
        this._hubConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:58283/chatHub')
        .build();
    }

    private startConnection(): void {
        this._hubConnection
        .start()
        .then(()=> {
            this.connectionIsEstablished = true;
            console.log('Hub connection started');
            this.connectionEstablished.emit(true);
        }).catch(err => {
            console.log('Error while establishing connection, retrying...');
            setTimeout(() => this.startConnection(), 5000);
        });
    }

    private registerOnServerEvents():void {
        this._hubConnection.on('ReceiveMessage', (data: any) => { 
            this.messageReceived.emit(data);
        });
    }
}