import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TodoRequest } from './todo-request.model';
import { TodoRoom } from './todo-room.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  mode = 'list'

  myrequests: any[]
  roomList: any[]
  searchList: any[]
  requestList: any[]
  now: number

  constructor(private todoService: TodoService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.todoService.getRooms().subscribe(data => {
      this.roomList = data
    })
    this.now = new Date().getTime()

    this.todoService.getRequestList().subscribe(data => {
      this.requestList = data
    })

    this.todoService.findAllMyRequest().subscribe(data => {
      this.myrequests = data
    })
  }

  changeMode(mode: string) {
    // if (mode === 'list') {
    //   this.roomList = this.todoService.getRooms()
    // }
    this.mode = mode
    this.router.navigate(['/todos'])
  }

  searchRoom(roomId: string) {
    this.todoService.searchRoom(roomId).subscribe(data => {
      this.searchList = data
    })
  }

  createNewRoom() {
    this.router.navigate(['/todos', 'new'])
  }

  requestJoin(key: string, host: string, roomName: string) {
    // console.log(key)
    this.todoService.newRequest(key, host, roomName)
    window.alert('request send')
  }

  joinAvailable(room: TodoRoom) {
    const list = this.myrequests.filter(item => {
      return item.requestRoom == room.key
    })

    const inRoom = room.roomMembers.includes(this.authService.userData.email)

    return (!inRoom && list.length == 0)
  }


  allowRequest(index: number) {
    let request = this.requestList[index]
    // console.log(JSON.stringify(request))
    const room = this.todoService.getRoom(request.requestRoom)
    if (!room.roomMembers.includes(request.requester)) {
      room.roomMembers.push(request.requester)
    }
    this.todoService.updateRoom(room)
    request.verify = true
    this.todoService.verifyRequest(request)
    this.requestList[index] = request
  }

}
