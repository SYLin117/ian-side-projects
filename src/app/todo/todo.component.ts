import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TodoRequest } from './todo-request.model';

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

  roomIsRequested(key: string) {
    const list = this.myrequests.filter(item => {
      return item.requestRoom == key
    })
    return list.length > 0
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

  timeDifference(time1, time2): string {
    let date1 = new Date(time1)
    let date2 = new Date(time2)
    var difference = date1.getTime() - date2.getTime();

    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24

    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60

    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60

    var secondsDifference = Math.floor(difference / 1000);

    // console.log('difference = ' +
    //   daysDifference + ' day/s ' +
    //   hoursDifference + ' hour/s ' +
    //   minutesDifference + ' minute/s ' +
    //   secondsDifference + ' second/s ');
    // console.log('daysDifference: ' + daysDifference)
    return daysDifference + ' days ago'
  }
}
