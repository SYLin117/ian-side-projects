import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoService } from '../services/todo.service';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { TodoRoom } from './todo-room.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  mode = 'list'

  roomList: any[]
  searchList: any[]
  now: number

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.roomList = this.todoService.getRooms()
    this.now = new Date().getTime()
  }

  changeMode(mode: string) {
    if (mode === 'list') {
      this.roomList = this.todoService.getRooms()
    }
    this.mode = mode
    this.router.navigate(['/todos'])
  }

  searchRoom(roomId: string) {

  }

  createNewRoom() {
    this.router.navigate(['/todos', 'new'])
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
    console.log('daysDifference: ' + daysDifference)
    return daysDifference + ' days ago'
  }
}
