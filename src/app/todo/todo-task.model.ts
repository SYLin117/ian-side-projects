
export class TodoTask {
  public taskName: string;
  public addUser: string;
  public lastUpdate: number;


  constructor(taskName: string, addUser: string, time?: number) {
    this.taskName = taskName;
    this.addUser = addUser;
    let now = new Date();
    this.lastUpdate = time ? time : now.getTime()
  }
}
