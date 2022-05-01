import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as net from 'net';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private clients = [];

  // constructor() {}

  afterInit(server: any) {
    this.initListenTCP();
  }

  private initListenTCP() {
    const clientTcp = net.connect(1235, 'localhost');
    clientTcp.setEncoding('utf8');

    clientTcp.on('connect', () => {
      let json = {
        pattern: "identify_socket",
        payload: {
          role: "admin"
        }
      }
      clientTcp.push('')
      clientTcp.write(JSON.stringify(json) + "\n");
      console.log('connection client ok');
      console.log(JSON.stringify(json))
      let jsonsearch = {
        pattern: "search_location_history",
        payload: {
          userId: "user1",
          fromDate: "2021-11-27",
          toDate: "2021-11-27"
        }
      }
      let jsoncreate = {
        pattern: "create_redzone",
        payload: {
          redzoneName: "DDDD",
          listLocation: "eeeee"
        }
      }
      let jsongetredzone = {
        pattern: "get_redzone",
        payload: {}

      }
      // clientTcp.push('')
      // clientTcp.write(JSON.stringify(jsongetredzone) + "\n");
      // console.log(JSON.stringify(jsongetredzone))
      clientTcp.push('')
      clientTcp.write(JSON.stringify(jsonsearch) + "\n");
      console.log(JSON.stringify(jsonsearch))

    });

    clientTcp.on('error', function (error) {
      console.log(error);
    });

    clientTcp.on('close', function (error) {
      console.log('Connection closed!', error);
    });

    clientTcp.on('data', (data) => {
      console.log('message was received', data);
      this.server.emit('hihi\n');
    });
  }

  async handleConnection(socket: Socket) {
    //
  }

  async handleDisconnect(socket: Socket) {
    //
  }
}
