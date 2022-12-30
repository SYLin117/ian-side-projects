export class ChatRoom {
  key?: string
  accepter: string
  accepter_name: string
  requester: string
  requester_name: string
  time: number = new Date().getTime()
}
