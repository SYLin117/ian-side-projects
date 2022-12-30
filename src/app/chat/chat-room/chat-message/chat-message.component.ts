import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, } from '@angular/router';
import { map, mergeMap, switchMap } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { ChatMessage } from '../../chat-message.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  roomKey: string
  messages: ChatMessage[] = []
  constructor(private activatedRoute: ActivatedRoute, private chatService: ChatService) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      mergeMap((param: ParamMap) => {
        this.roomKey = param.get('key')
        return this.chatService.getMessages().pipe(
          map(messages => {
            return messages.filter(message => {
              return message.roomKey == this.roomKey
            })
          })
        )
      })
    ).subscribe(messages => {
      this.messages = messages
    })

  }

}
