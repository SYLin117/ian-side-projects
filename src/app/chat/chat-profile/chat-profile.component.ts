import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { ChatUser } from '../chat-user.model';
import { Country } from '../country.model';
import { Language } from '../language.model';

@Component({
  selector: 'app-chat-profile',
  templateUrl: './chat-profile.component.html',
  styleUrls: ['./chat-profile.component.css']
})
export class ChatProfileComponent implements OnInit {

  showAlert = false
  alertTimeout = null

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    nativeLanguage: new FormControl([], [Validators.required]),
    interestLanguage: new FormControl([], [Validators.required])
  });

  countries: Country[]
  languages: Language[]
  userData: ChatUser

  constructor(private router: Router, private chatService: ChatService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.chatService.getUserData().subscribe(data => {
      if (data.length > 0) {
        this.userData = data[0]
        this.profileForm.patchValue({
          name: this.userData.name,
          age: this.userData.age.toString(),
          country: this.userData.country,
          nativeLanguage: this.userData.nativeLanguage,
          interestLanguage: this.userData.interestLanguage
        })
      }
    })
    this.chatService.getLanguages().subscribe(data => {
      this.languages = data
    })
    this.chatService.getCountries().subscribe(data => {
      this.countries = data
    })
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      clearTimeout(this.alertTimeout)
      this.showAlert = true
      this.alertTimeout = setTimeout(() => {
        this.showAlert = false
      }, 1500)
      return
    }

    // console.log(this.profileForm.value.interestLanguage)
    let newUser = new ChatUser()
    newUser.name = this.profileForm.value.name
    newUser.age = +this.profileForm.value.age
    newUser.country = this.profileForm.value.country
    newUser.interestLanguage = this.profileForm.value.interestLanguage
    newUser.nativeLanguage = this.profileForm.value.nativeLanguage
    newUser.latestLogin = new Date().getTime()
    this.chatService.createNewUser(newUser)
  }

}
