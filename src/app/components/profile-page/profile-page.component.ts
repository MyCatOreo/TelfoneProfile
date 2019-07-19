import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from './../../services/profileSvc.service';
import { Profile, initProfile } from './../../models/profile';
import { MatSnackBar} from '@angular/material/snack-bar';

import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadProfileList } from '../../reducers/profile.actions';
import { ProfileState } from '../../reducers';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.sass']
})
export class ProfilePageComponent implements OnInit {

  profileList: Profile[];
  profileList$: Observable<Profile[]>;

  activeProfile: Profile;
  // activeProfile$: Observable<Profile>; //search me: for activeProfile
  private profileStateSubscription: Subscription;

  constructor(private profileSvc: ProfileService, 
    private _snackBar: MatSnackBar, 
    private store: Store<ProfileState>) { 
  //  this.profileState$ = store.select('activeProfile'); //search me: set observable for activeProfile
  
    this.profileList$ = this.profileSvc.getProfileAll();


  }

  ngOnInit() {
    //serach me: init store subscription here

    // this.profileStateSubscription = this.activeProfile$.subscribe((state) =>{
    //   this.activeProfile = state; //search me: set active profile from updated state
    // });

    this.getProfileList();
  }
  
  ngOnDestry() {
    //search me: unsubscribe here
  //  this.profileStateSubscription.unsubscribe();
  }

  addProfile(data: Profile) {
    this.profileSvc.addProfile(data).subscribe(response => {
      console.log(response);
      this.getProfileList();
      this.clearProfile();
      this.openSnackBar("Profile Updated!","ok");
    },
    error => {
      console.log(error)
    });
  }

  updateProfile(id: number, data: Profile) {
    this.profileSvc.updateProfileById(id, data).subscribe(response => {
      console.log(response);
      this.getProfileList();
      this.clearProfile();
      this.openSnackBar("Profile Updated!","ok");
    },
    error => {
      console.log(error)
    });
  }

  loadProfile(id: number) {
  //  debugger;
    this.profileSvc.getProfileById(id).subscribe(response => {
      //serach me
      this.activeProfile = response;
      console.log(this.activeProfile);
    },
    error => {
      console.log(error);
    });
  }

  getProfileList() {
    this.profileSvc.getProfileAll().subscribe(response => {
    //  this.profileList = response;
      this.store.dispatch(loadProfileList({profileList: response}));
    //  console.log(this.profileList);
    },
    error => {
      console.log(error);
    });
  } 

  clearProfile() {
    //search me

    // this.store.dispatch({
    //   type: CLEAR_PROFILE,
    //   payload: true
    // });

    this.activeProfile = Object.assign({}, initProfile);
  }

  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onProfileSelected(id) {
    console.log(id);
    this.loadProfile(id);
  }

  onProfileSumbitted(profile)
  {
   // debugger;
   // let result =  {};
    // this.activeProfile$.subscribe(data => {
    //   result = data;
    // });

  //  this.store.select('activeProfile').subscribe((data) => result = data );


    // this.store.dispatch({
    //   type: SUBMIT_PROFILE,
    //   payload: profile
    // });

    console.log(profile);
    if (profile.userId && profile.userId != '') {
      this.updateProfile(profile.userId, profile);
    }
    else {
      this.addProfile(profile);
    }

  }


}
