import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { ChatRequest } from '../chat-request.model';
import { ChatUser } from '../chat-user.model';
import { Country } from '../country.model';
import { Language } from '../language.model';

@Component({
  selector: 'app-chat-search',
  templateUrl: './chat-search.component.html',
  styleUrls: ['./chat-search.component.css']
})
export class ChatSearchComponent implements OnInit {

  searchForm = new FormGroup({
    age: new FormControl('',),
    country: new FormControl('',),
    nativeLanguage: new FormControl('',),
    interestLanguage: new FormControl('',)
  });

  searchResult: ChatUser[] = []
  requestList: ChatRequest[] = []

  countries: Country[]
  languages: Language[]

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit(): void {
    this.chatService.getLanguages().subscribe(data => {
      this.languages = data
    })
    this.chatService.getCountries().subscribe(data => {
      this.countries = data
    })
    this.chatService.getMyRequests().subscribe(data => {
      console.log('requestList: ' + JSON.stringify(this.requestList))
      this.requestList = data
    })
  }


  onSearch() {
    const age = +this.searchForm.value.age
    const country = this.searchForm.value.country
    const nativeLanguage = this.searchForm.value.nativeLanguage
    const interestLanguage = this.searchForm.value.interestLanguage

    this.chatService.searchUser(age, country, nativeLanguage, interestLanguage).subscribe(data => {
      this.searchResult = data
    })
  }

  async requestChat(user: ChatUser) {
    let newRequest = new ChatRequest()
    newRequest.requester = this.authService.userData.uid
    newRequest.requesterName = this.chatService.chatUserData.name
    newRequest.requested = user.uid
    newRequest.requestedName = user.name
    console.log(JSON.stringify(newRequest))
    this.chatService.newRequest(newRequest)
      .then(result => {
        window.alert('request sended')
      })
      .catch(error => {
        window.alert(error)
      })
  }

  isRequested(uid: string) {
    // console.log('request list:' + JSON.stringify(this.requestList))
    let find = this.requestList.some(request => {
      return request.requester == this.authService.userData.uid
    })
    // console.log('has requested: ' + find)
    return find
  }
}
