/* eslint-disable prettier/prettier */
import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, WebSocketServer, ConnectedSocket, WsException } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ChatsService } from './chats.service'
import { EnterChatDto } from './dto/enter-chat.dto'
import { CreateMessageDto } from './messages/dto/create-message.dto'
import { MessagesService } from './messages/messages.service'

@WebSocketGateway({
  namespace: 'chats' // 전체 채팅
})
export class ChatsGateway implements OnGatewayConnection {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: MessagesService
  ) {}

  @WebSocketServer()
  server: Server

  handleConnection(socket: Socket) {
    console.log(`on connect called : ${socket.id}`)
  }

  @SubscribeMessage('enter_chat')
  //방의 chatID(number)들을 리스트로 받는다
  public async enterChat(@MessageBody() data: EnterChatDto, @ConnectedSocket() socket: Socket) {
    for (const chatId of data.chatId) {
      const exists = await this.chatsService.checkIfChatExists(chatId)

      if (!exists) {
        throw new WsException({
          success: false,
          message: `존재하지 않는 채팅방 입니다. Chat ID : ${chatId}`
        })
      }
    }

    socket.join(data.chatId.map((x) => x.toString()))
  }

  @SubscribeMessage('send_message')
  public async sendMessage(@MessageBody() dto: CreateMessageDto, @ConnectedSocket() socket: Socket) {
    console.log(dto.message)

    const chateExists = await this.chatsService.checkIfChatExists(dto.chatId)

    if (!chateExists) {
      throw new WsException({
        success: false,
        message: `존재하지 않는 채팅방 입니다. Chat ID : ${dto.chatId}`
      })
    }

    const message = await this.messagesService.createMessage(dto)

    socket.to(message.chat.id.toString()).emit('receive_message', message.message)
  }
}
