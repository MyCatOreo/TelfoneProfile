import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profile, initProfile } from './../../models/profile';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.sass']
})
export class ProfileFormComponent implements OnInit {

  workingProfile: Profile; // for edit

  private _profile: Profile;
  @Input() set profile(profile: Profile) {
    this._profile = profile;
    this.workingProfile = Object.assign({}, this.profile);
  };
  get profile(): Profile{
    return this._profile;
  }

  @Output() profileSumbit = new EventEmitter<Profile>();

  constructor() { }

  ngOnInit() {
    if (this.profile) {
      this.workingProfile = Object.assign({}, this.profile);
    }
    else {
      this.workingProfile = Object.assign({}, initProfile);
    }
  }

  loadWorkingProfile() {
    this.workingProfile = Object.assign({}, this.profile);
  }

  submit() {
    this.profileSumbit.emit(this.workingProfile);
  }

}
