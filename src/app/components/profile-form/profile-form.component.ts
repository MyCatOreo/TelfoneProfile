import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators} from '@angular/forms';
import { Profile, initProfile } from './../../models/profile';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.sass']
})
export class ProfileFormComponent implements OnInit {

  workingProfile: Profile; // for edit

  // firstNameChanges: string;
  // firstNameStatus: string;

  profileForm = new FormGroup({
    userId: new FormControl(undefined),
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    displayName: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    department: new FormControl(''),
    team: new FormControl(''),
  });

  private _profile: Profile;
  @Input() set profile(profile: Profile) {
    this._profile = profile;
    if(profile) {
      this.profileForm.patchValue(profile); //have to use patchValue because of userId
    }
  };
  get profile(): Profile{
    return this._profile;
  }

  @Output() profileSumbit = new EventEmitter<Profile>();

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    //search me: test
    // this.profileForm.get('firstName').valueChanges.subscribe(data => this.firstNameChanges = data);
    // this.profileForm.get('firstName').statusChanges.subscribe(data => this.firstNameStatus = data);
  }

  loadWorkingProfile() {
    this.workingProfile = Object.assign({}, this.profile);
  }

  //search me
  clearProfile() {
    this.profileForm.reset();
  }

  submit() {
    if (this.profileForm.valid) {
      this.profileSumbit.emit(this.profileForm.value as Profile);
    }
    else {
      //search me
    }
  }

}
