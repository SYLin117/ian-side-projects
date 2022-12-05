import { Component, OnInit } from '@angular/core';
import { uppercases, lowercases, numbers, specials } from '../shared/custom-function';
import { Clipboard } from '@angular/cdk/clipboard'

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.css']
})
export class PasswordGeneratorComponent implements OnInit {

  constructor(private clipboard: Clipboard) {

  }

  title = 'password-generator';
  // gen password
  randomPassword = ""

  // range
  sizeRangeMin = 6
  sizeRangeMax = 18
  rangeStep = 1
  rangeDefaultValue = 12

  // checkboxs
  uppercase = true
  lowercase = true
  numbers = true
  specials = true

  // clipboard
  copyClicked = false
  clipIntervalID = 0;

  // generate
  reGenClicked = false
  genIntervalID = 0

  ngOnInit() {
    this.createPassword()
  }

  onSizeChange(value: any) {
    let num = +value
    if (num < this.sizeRangeMin) {
      num = this.sizeRangeMin
    }
    if (num > this.sizeRangeMax) {
      num = this.sizeRangeMax
    }
    this.rangeDefaultValue = num
    this.createPassword()
  }

  onUppercaseChange(event: any) {

    this.uppercase = event.target.checked
    if (!this.checkDisable()) {
      event.target.checked = true
      this.uppercase = true
    }
    this.createPassword()
  }

  onLowercaseChange(event: any) {

    this.lowercase = event.target.checked
    if (!this.checkDisable()) {
      event.target.checked = true
      this.lowercase = true
    }
    this.createPassword()
  }
  onSpecialChange(event: any) {

    this.specials = event.target.checked
    if (!this.checkDisable()) {
      event.target.checked = true
      this.specials = true
    }
    this.createPassword()
  }

  onNumberschange(event: any) {
    this.numbers = event.target.checked
    if (!this.checkDisable()) {
      event.target.checked = true
      this.numbers = true
    }
    this.createPassword()
  }

  checkDisable(): boolean {
    let cnt = 0
    if (!this.uppercase) cnt += 1
    if (!this.lowercase) cnt += 1
    if (!this.numbers) cnt += 1
    if (!this.specials) cnt += 1

    if (cnt > 3) {
      return false
    }
    return true
  }

  onReload() {
    this.reGenClicked = true

    clearInterval(this.genIntervalID)
    this.genIntervalID = window.setInterval(() => {
      this.reGenClicked = false
      clearInterval(this.genIntervalID)
    }, 750);

    this.createPassword()
  }


  onCopy(password: string) {
    // console.log(btn)
    this.copyClicked = true

    clearInterval(this.clipIntervalID)
    this.clipIntervalID = window.setInterval(() => {
      this.copyClicked = false
      clearInterval(this.clipIntervalID)
    }, 750);

    this.clipboard.copy(password)
  }

  createPassword() {
    // console.log(`uppercase: ${this.uppercase}`)
    // console.log(`lowercase: ${this.lowercase}`)
    // console.log(`numbers: ${this.numbers}`)
    // console.log(`specials: ${this.specials}`)

    // console.log(`size: ${this.rangeDefaultValue}`)



    let ascii_range: number[] = []
    if (this.uppercase) {
      ascii_range = ascii_range.concat(uppercases)
    }
    if (this.lowercase) {
      ascii_range = ascii_range.concat(lowercases)
    }
    if (this.numbers) {
      ascii_range = ascii_range.concat(numbers)
    }
    if (this.specials) {
      ascii_range = ascii_range.concat(specials)
    }

    let newPwd = ""
    for (let i = 0; i < this.rangeDefaultValue; i++) {
      // console.log(ascii_range[Math.floor(Math.random() * ascii_range.length)])
      newPwd += String.fromCharCode(ascii_range[Math.floor(Math.random() * ascii_range.length)])
    }
    // console.log(newPwd)
    this.randomPassword = newPwd

  }



}
