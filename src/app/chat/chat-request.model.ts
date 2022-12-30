export class ChatRequest{
  key?: string
  requester: string
  requesterName: string
  requested: string
  requestedName: string
  viewed: boolean = false
  allowed: boolean = false
  blocked: boolean = false
  latestUpdate: number = new Date().getTime()
  // constructor(private foo: string = "foo", private bar: string = "bar") {}
}


