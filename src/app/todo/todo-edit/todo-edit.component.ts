import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { take, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TodoRoom } from '../todo-room.model';
import { TodoTask } from '../todo-task.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  @ViewChild('todoForm') todoForm: NgForm

  newRoom: boolean = false
  roomId: string

  room: any = null
  todo: any[] = []
  done: any[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {

      const now = new Date()
      this.newRoom = params.get('id') === 'new';

      if (!this.newRoom) {
        this.roomId = params.get('id')
      } else {
        this.roomId = null
      }
      this.room = this.todoService.getRoom(this.roomId)

      if (this.room) {
        this.todo = this.room.todo ? this.room.todo.slice() : []
        this.done = this.room.done ? this.room.done.slice() : []

        this.done = this.done.filter(item => {
          const lastUpdate = new Date(item.lastUpdate)
          var difference = now.getTime() - lastUpdate.getTime();
          var dayDiff = Math.floor(difference / 1000 / 60 / 60 / 24);
          var secondsDifference = Math.floor(difference / 1000);
          return dayDiff < 3
        })
      }

      if (this.newRoom) {
        this.room = null
        this.todo = []
        this.done = []
      }

    });
  }

  drop(event: CdkDragDrop<TodoTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addNewTask(task: string) {
    if (task.length > 0) {
      const newTask = new TodoTask(task, this.authService.userData.email)
      this.todo.push(newTask)
    }
  }

  saveToCloud() {
    if (this.newRoom) {
      const form = this.todoForm.form
      const roomName = form.value.roomName

      console.log(this.authService.userData.email)
      let room = new TodoRoom(roomName, this.authService.userData.email, this.todo, this.done)
      this.todoService.saveNewRoom(room)
    } else {
      this.room.todo = this.todo
      this.room.done = this.done
      this.room.lastUpdate = new Date().getTime()
      this.todoService.updateRoom(this.room)

    }
    window.alert('save!')
  }
}
