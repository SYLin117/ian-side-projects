import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';
import { BehaviorSubject, filter, flatMap, map, Observable, of, Subject } from 'rxjs';
import { Language } from '../chat/language.model';
import { ChatUser } from '../chat/chat-user.model';
import { Country } from '../chat/country.model';
import { ChatRequest } from '../chat/chat-request.model';
import { ChatRoom } from '../chat/chat-room.model';
import { ChatMessage } from '../chat/chat-message.model';


@Injectable({ providedIn: 'root' })
export class ChatService implements OnInit {


  languagesRef: AngularFireList<Language>
  usersRef: AngularFireList<ChatUser>
  userRef: AngularFireList<ChatUser>
  countryRef: AngularFireList<Country>
  requestRef: AngularFireList<ChatRequest>

  roomsRef: AngularFireList<ChatRoom>
  messagesRef: AngularFireList<ChatMessage>

  chatUserData: ChatUser

  constructor(db: AngularFireDatabase, private authService: AuthService) {
    // this.languages$ = db.list('/chat/languages').valueChanges()
    this.languagesRef = db.list<Language>('/chat/languages')
    this.usersRef = db.list<ChatUser>('/chat/users')
    this.userRef = db.list<ChatUser>('/chat/users')
    this.requestRef = db.list<ChatRequest>('/chat/requests')
    this.roomsRef = db.list<ChatRoom>('/chat/rooms')

    this.countryRef = db.list<Country>('/chat/countries')

    this.usersRef.valueChanges().pipe(
      map(userArr => {
        userArr = userArr.filter(user => {
          return user.uid == this.authService.userData.uid
        })
        return userArr.length == 0 ? null : userArr[0]
      })
    ).subscribe(data => {
      this.chatUserData = data
    })
  }

  ngOnInit(): void {

  }


  getUserData(): Observable<ChatUser[]> {
    return this.userRef.valueChanges().pipe(
      map(userArr => {
        return userArr.filter(user => {
          return user.uid == this.authService.userData.uid
        })
      })
    )
  }

  getLanguages() {
    return this.languagesRef.valueChanges()
  }

  getCountries() {
    return this.countryRef.valueChanges()
  }

  createNewUser(newUser: ChatUser) {
    // this.usersRef.push(newUser)
    const uid = this.authService.userData.uid
    newUser.uid = uid
    this.usersRef.update(uid, newUser);
  }

  searchUser(age?: number, country?: string, nativeLanguage?: string, interestLanguage?: string) {
    return this.usersRef.valueChanges().pipe(
      map(userArr => {
        let filterList = userArr
        if (age) {
          filterList = filterList.filter(item => {
            return item.age >= age
          })
        }
        if (country) {
          filterList = filterList.filter(item => {
            return item.country == country
          })
        }

        if (nativeLanguage) {
          filterList = filterList.filter(item => {
            return item.nativeLanguage.includes(nativeLanguage)
          })
        }

        if (interestLanguage) {
          filterList = filterList.filter(item => {
            return item.interestLanguage.includes(interestLanguage)
          })
        }

        // console.log('filterList: ' + JSON.stringify(filterList))

        filterList = filterList.filter(item => {
          return item.uid != this.authService.userData.uid
        })
        // console.log('filterList: ' + filterList)
        return filterList
      })
    )
  }

  getMyRequests() {
    // get all request got Me involve. either requester or requested
    return this.requestRef.valueChanges().pipe(
      map(data => {
        return data.filter(item => {
          const match = (item.requester == this.authService.userData.uid) || (item.requested == this.authService.userData.uid)
          console.log('find match: ' + match)
          return match
        })
      })
    )
  }

  getRequests2Me() {
    return this.requestRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      ),
      map(changes => {
        return changes.filter(change => {
          return change.requested == this.authService.userData.uid && change.viewed == false
        })
      })
    )
  }

  newRequest(request: ChatRequest) {
    return this.requestRef.push(request)
  }

  updateRequest(request: ChatRequest) {
    return this.requestRef.update(request.key, request)
  }

  getMyRooms() {
    return this.roomsRef.valueChanges().pipe(
      map(rooms => {
        return rooms.filter(room => {
          return room.requester == this.authService.userData.name || room.accepter == this.authService.userData.name
        })
      })
    )
  }

  createNewRoom(room: ChatRoom) {
    return this.roomsRef.push(room)
  }

  getMessagesByRoomKey(key: string) {
    return this.messagesRef.valueChanges().pipe(
      map(messages => {
        return messages.filter(message => {
          return message.roomKey == key
        })
      })
    )
  }

  getMessages() {
    return this.messagesRef.valueChanges()
  }



}


