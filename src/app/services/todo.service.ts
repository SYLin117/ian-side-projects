import { Injectable } from '@angular/core';
import { TodoRoom } from '../todo/todo-room.model';
import { filter, map, Observable, } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';
import { TodoRequest } from '../todo/todo-request.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosRoomRef: AngularFireList<TodoRoom>
  todosRequestRef: AngularFireList<TodoRequest>

  private myRooms: TodoRoom[] = []
  private searchRooms: TodoRoom[]

  constructor(db: AngularFireDatabase, private authService: AuthService) {
    this.todosRoomRef = db.list('/todos')
    this.todosRequestRef = db.list('/todo-requests')
  }

  getRooms(): Observable<TodoRoom[]> {
    // snapshotChanges 回傳 observable
    const rooms = this.todosRoomRef.snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          ).filter(item => {
            // console.log('members: ' + JSON.stringify(item.roomMembers))
            // console.log(item.roomMembers.includes(this.authService.userData.email))
            return item.roomMembers.includes(this.authService.userData.email)
          })
        )
      )
    rooms.subscribe(data => {
      this.myRooms = data
    })
    return rooms
  }

  getRoom(key: string) {
    // console.log('rooms: ' + JSON.stringify(this.todoRooms))
    const list = this.myRooms.filter((item) => {
      return item.key === key
    })
    return list.length > 0 ? list[0] : null
  }

  saveNewRoom(room: TodoRoom) {
    // this.dataService.createNewRoom(room)
    return this.todosRoomRef.push(room)
  }

  updateRoom(room: TodoRoom) {
    return this.todosRoomRef.update(room.key, room);
  }

  searchRoom(key: string) {
    return this.todosRoomRef.snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          ).filter(item => {
            return item.key == key
          })
        )
      )
  }

  newRequest(key: string, host: string, roomName: string) {
    const request = new TodoRequest(this.authService.userData.email, key, host, new Date().getTime(), roomName)
    return this.todosRequestRef.push(request)
  }

  getRequestList() {
    // find request to my room
    return this.todosRequestRef.snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          ).filter(item => {
            return item.host == this.authService.userData.email
          })
        )
      )
  }

  findAllMyRequest() {
    // find request to my room
    return this.todosRequestRef.snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          ).filter(item => {
            return item.requester == this.authService.userData.email
          })
        )
      )
  }

  verifyRequest(request: TodoRequest){
    return this.todosRequestRef.update(request.key, request)
  }

}
