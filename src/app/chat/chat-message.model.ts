export class ChatMessage{
  key?: string
  roomKey: string
  sender: string
  receiver: string
  message: string
  time: number
  read: boolean = false
}


