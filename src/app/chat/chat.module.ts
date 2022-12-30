import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatProfileComponent } from './chat-profile/chat-profile.component';
import { ChatSearchComponent } from './chat-search/chat-search.component';
import { PipeModule } from '../pipe/shared.module';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatMessageComponent } from './chat-room/chat-message/chat-message.component';



@NgModule({
  declarations: [
    ChatComponent,
    ChatProfileComponent,
    ChatSearchComponent,
    ChatRoomComponent,
    ChatMessageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChatRoutingModule,
    PipeModule
  ]
})
export class ChatModule { }
