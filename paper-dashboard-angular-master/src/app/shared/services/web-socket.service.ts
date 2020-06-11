import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { ServerMessage, MessageType } from '../models/ServerMessage';
import { Observable, Subject } from 'rxjs';
import { Statistique } from '../models/Statistique';
import { Appreciation } from '../models/Appreciation';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private WS_URL = "wss://ac88n1oa17.execute-api.eu-west-3.amazonaws.com/dev";

  private webSocketSubject : WebSocketSubject<any>;
  private appStream: Subject<ServerMessage>;
  
  constructor() {
    this.appStream = new Subject();
    this.webSocketSubject = webSocket(this.WS_URL);
    this.connectToWs();
  }

  connectToWs() : void {
    this.webSocketSubject.subscribe(
      (msg:any) => {
        let serverMessage : ServerMessage = {
          type : <any>MessageType[msg.type] as MessageType,
          objectRef : new Statistique(msg.object.id, msg.object.title, msg.object.value, msg.object.icon,
            <Appreciation>Appreciation[msg.object.appreciation])
        }
        this.appStream.next(serverMessage);
      },
      err => console.log(err),
      () => {
        console.log("Websocket disconnected. Retry.");
        this.connectToWs();
      }
    );
  }

  getServerObservable(): Observable<ServerMessage> {
    return this.appStream;
  }

}
