import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { TodoRoom } from '../todo/todo-room.model';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoRooms: any[]

  constructor(private dataService: DataStorageService) {

  }

  getRooms() {
    // snapshotChanges 回傳 observable
    this.dataService.todosRoomRef.snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        ),
      ).subscribe(data => {
        this.todoRooms = data
        console.log(data)
      })
    return this.todoRooms.slice()
  }

  getRoom(key: string) {
    console.log('rooms: ' + JSON.stringify(this.todoRooms))
    const list = this.todoRooms.filter((item) => {
      return item.key === key
    })
    return list.slice()
  }

  saveNewRoom(room: TodoRoom) {
    // this.dataService.createNewRoom(room)
  }

}
