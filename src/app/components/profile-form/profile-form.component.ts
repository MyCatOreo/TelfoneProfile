import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profile, initProfile } from './../../models/profile';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.sass']
})
export class ProfileFormComponent implements OnInit {

  @Input() profile: Profile;
  @Output() profileSumbit = new EventEmitter<Profile>();

  workingProfile: Profile;

  constructor() { }

  ngOnInit() {
    if (this.profile) {
      this.workingProfile = Object.assign({}, this.profile);
    }
    else {
      this.workingProfile = initProfile;
    }
  }

  submit() {
    this.workingProfile.email = 'change@t.c';
    debugger;
    this.profileSumbit.emit(this.workingProfile);
  }

}
