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
  room: any

  todo: TodoTask[]
  done: TodoTask[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {

      this.newRoom = params.get('id') === 'new';

      if (!this.newRoom) {
        this.roomId = params.get('id')
      } else {
        this.roomId = null
      }
      console.log('room id:' + this.roomId)
      if (this.roomId) {
        this.room = this.todoService.getRoom(this.roomId)
        if (this.room) {
          this.todo = this.room.todo ? this.room.todo.slice() : []
          this.done = this.room.done ? this.room.done.slice() : []
        } else {
          this.todo = []
          this.done = []
        }

      } else {
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

    }
  }
}
