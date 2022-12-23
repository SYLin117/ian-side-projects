import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, QueryFn } from '@angular/fire/compat/database';
import { Observable } from '@firebase/util';
import { map, tap } from 'rxjs';
import { Language } from '../chat/language.model';
import { AuthService } from './auth.service';

interface User {
  key?: string
  uid: string
  name: string
  age: number
  country: string
  language: string
}


@Injectable({ providedIn: 'root' })
export class ChatService {


  languages: AngularFireList<Language>
  obs$: Observable<any[]>

  constructor(db: AngularFireDatabase, private authService: AuthService) {
    // this.languages$ = db.list('/chat/languages').valueChanges()
    this.languages = db.list<Language>('/chat/languages')

  }

}


