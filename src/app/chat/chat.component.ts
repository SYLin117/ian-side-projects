import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';
import { ChatUser } from './chat-user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  userData: ChatUser = null
  disableOthers = true

  constructor(private router: Router, private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getUserData().subscribe(data => {
      if (data.length == 0) {
        this.disableOthers = true
        this.router.navigate(['/chat', 'profile'])
      }else{
        this.userData = data[0]
        this.disableOthers = false
        this.router.navigate(['/chat', 'rooms'])
      }
    })
  }

}
