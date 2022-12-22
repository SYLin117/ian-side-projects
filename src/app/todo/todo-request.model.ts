
export class TodoRequest {
  public key?: string | null;
  public requester: string;
  public requestRoom: string;
  public roomname: string
  public host: string
  public lastUpdate: number;
  public verify: boolean

  constructor(requester: string, requestRoom: string, host: string, lastUpdate: number, roomname?: string) {
    this.requester = requester
    this.requestRoom = requestRoom
    this.host = host
    this.lastUpdate = lastUpdate
    this.roomname = roomname
    this.verify = false
  }
}
