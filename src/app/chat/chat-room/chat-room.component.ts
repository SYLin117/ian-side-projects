import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ChatRequest } from '../chat-request.model';
import { ChatRoom } from '../chat-room.model';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  requests: ChatRequest[] = []
  rooms: ChatRoom[] = []

  constructor(private chatService: ChatService,) {

  }

  ngOnInit(): void {
    this.chatService.getRequests2Me().subscribe(data => {
      // console.log('request data: ' + data)
      this.requests = data
    })

    this.chatService.getMyRooms().subscribe(data => {
      this.rooms = data
    })
  }

  accept(request: ChatRequest) {
    let newRoom = new ChatRoom()
    newRoom.requester = request.requester
    newRoom.requester_name = request.requestedName
    newRoom.accepter = request.requested
    newRoom.accepter_name = request.requestedName

    let promise1 = this.chatService.createNewRoom(newRoom)

    request.allowed = true
    request.viewed = true
    console.log('request: ' + JSON.stringify(request))
    let promise2 = this.chatService.updateRequest(request)

    Promise.all([promise1, promise2])
      .then(() => {
        console.log('room created')
      })
      .catch(error => {
        console.log(error)
      })
  }

  block(request: ChatRequest) {

  }


}
