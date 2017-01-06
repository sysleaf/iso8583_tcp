import { Injectable } from '@angular/core';
// import {Subject} from 'rxjs/Rx';
import { Observable, Observer, Subject } from 'rxjs/Rx';


@Injectable()
export class WebSocketService {

    private socket: Subject<MessageEvent>;
    constructor() {

    }

    connect(url) {
        if (!this.socket) {
            this.socket = this.createWebSocket(url);
        }
        return this.socket;
    }

    createWebSocket(url) {
        let ws = new WebSocket(url);

        let observable = Observable.create(
            (obs: Observer<MessageEvent>) => {
                // ws.onmessage = obs.next.bind(obs);
                // ws.onerror = obs.error.bind(obs);
                // ws.onclose = obs.complete.bind(obs);
                ws.onmessage = obs.onmessage.bind(obs);
                ws.onerror = obs.onerror.bind(obs);
                ws.onclose = obs.onclose.bind(obs);
                return ws.close.bind(ws);
            }
        );

        let observer = {
            // next: (data: Object) => {
            //     if (ws.readyState === WebSocket.OPEN) {
            //         ws.send(JSON.stringify(data));
            //     }
            // },
            // error: (data: Object) => {
            //   console.log("error")
            // }
            onmessage: (data: Object) => {
              console.log("message received from websocket server")
            },
            onerror: (data: Object) => {
              console.log("error connecting to websocket server")
            },
            onclose: (data: Object) => {
              console.log("websocket connection closed")
            }
        };

        return Subject.create(observer, observable);

        // let host = location.hostname;
        // let sock_url = "ws://"+host+"/websocket"
        // let sock = new WebSocket(sock_url);
        // console.log("socket object", sock)
        // sock.onopen = function(){
        //   console.log("websocket connection opened")
        // }
        // sock.onmessage = function(){
        //   console.log("message received from websocket server")
        // }
        // sock.onerror = function(event: any){
        //   console.log(event)
        //   console.log("error connecting to websocket server")
        // }
        // sock.onclose = function(){
        //   console.log("websocket connection closed")
        // }
        // sock.close();
        // sock.send("Hi from client")
    }
}