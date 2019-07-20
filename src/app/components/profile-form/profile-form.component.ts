import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Profile, initProfile } from './../../models/profile';
import { ProfileState } from '../../reducers/profile.reducer';
import { profile } from 'src/app/reducers/profile.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.sass']
})
export class ProfileFormComponent implements OnInit{

  profileForm = new FormGroup({
    userId: new FormControl(''),
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    displayName: new FormControl('',[Validators.required]),//search me
    description: new FormControl(''),
    department: new FormControl(''),
    team: new FormControl(''),
  });

  activeProfile$: Observable<Profile>;

  @Output() profileSumbit = new EventEmitter<Profile>();

  constructor(private store: Store<ProfileState>) { }

  ngOnInit() {
    this.activeProfile$ = this.store.pipe(
      select(profile)
    )
    this.activeProfile$.subscribe(data => {
      if (data.userId) {
        this.profileForm.patchValue(data)
      }
      else {
        //search me
        this.profileForm.reset();
        this.profileForm.patchValue(initProfile);
      }
    });
  }

  //search me
  resetProfile() {
    this.profileForm.reset();
  }

  submit() {
    if (this.profileForm.valid) {
    //  debugger;
      this.profileSumbit.emit(this.profileForm.value as Profile);
    }
    else {
      //search me
    }
  }

}
