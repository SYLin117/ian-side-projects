import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { TodoRoom } from "../todo/todo-room.model";
import { TodoService } from "./todo.service";

// providedIn: 'root' has same effect as add it in app.module.ts
@Injectable({ providedIn: 'root' })
export class DataStorageService {

  todosRoomRef: AngularFireList<TodoRoom>
  todoPath = '/todos'

  // adding private let typescript auto create property for us
  constructor(private db: AngularFireDatabase) {
    this.todosRoomRef = db.list(this.todoPath)
  }

}
