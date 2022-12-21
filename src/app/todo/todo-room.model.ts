import { TodoTask } from "./todo-task.model";

export class TodoRoom {
  public key?: string | null;
  public roomId: number;
  public roomName: string;
  public roomHost: string;
  public createTime: number;
  public lastUpdate: number;
  public roomMembers: string[] = []

  public todo?: TodoTask[]
  public done?: TodoTask[]


  constructor(roomName: string, roomHost: string, todo: TodoTask[] = [], done: TodoTask[] = [], roomId?: number) {
    this.roomName = roomName;
    this.roomHost = roomHost;
    let now = new Date();
    this.createTime = now.getTime()
    this.lastUpdate = now.getTime()
    this.todo = todo
    this.done = done
    this.roomId = roomId ? roomId : Math.floor(Math.random() * 100000) + 1
    this.roomMembers.push(roomHost)
  }
}
