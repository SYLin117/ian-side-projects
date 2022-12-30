import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { ChatProfileComponent } from './chat-profile/chat-profile.component';
import { ChatMessageComponent } from './chat-room/chat-message/chat-message.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatSearchComponent } from './chat-search/chat-search.component';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  {
    path: 'chat', component: ChatComponent, canActivate: [AuthGuard], children: [
      { path: 'profile', component: ChatProfileComponent },
      { path: 'search', component: ChatSearchComponent },
      {
        path: 'rooms', component: ChatRoomComponent, children: [
          { path: ':key', component: ChatMessageComponent }
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }



