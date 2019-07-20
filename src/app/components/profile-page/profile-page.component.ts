import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../../services/profileSvc.service';
import { Profile } from './../../models/profile';
import { MatSnackBar} from '@angular/material/snack-bar';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { ProfileState } from '../../reducers/profile.reducer';
import { profileList, profile } from 'src/app/reducers/profile.selectors';
import { ProfileActions } from 'src/app/reducers/action-types';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.sass']
})
export class ProfilePageComponent implements OnInit {

  profileList$: Observable<Profile[]>;

  activeProfileIndex: number;
  activeProfile$: Observable<Profile>;

  constructor(private profileSvc: ProfileService, private _snackBar: MatSnackBar, private store: Store<ProfileState>) { }

  ngOnInit() {
    //subscript store $ here
    this.profileList$ = this.store.pipe(
      select(profileList)
    );

    this.activeProfile$ = this.store.pipe(
      select(profile)
    );

    //load the list when page loads
    this.getProfileList();

    //update every 30s
    this.profileSvc.profileListAutoUpdate().subscribe();
  }

  /**
   * get new profile list from db
   */
  getProfileList() {
    this.profileSvc.getProfileAll().subscribe(response => {
      this.store.dispatch(ProfileActions.loadProfileList({profileList: response}));
    },
    error => {
      console.log(error);
    });
  } 

  retrieveProfile(index: number | undefined) {
    this.store.dispatch(ProfileActions.retrieveProfile({activeProfileIndex: index}));
  }

  clearProfile() {
    //search me: known bug on New Profile button
    this.store.dispatch(ProfileActions.clearProfile());
  }

  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onProfileSelected(index) {
    this.retrieveProfile(index);
  }

  onProfileSumbitted(profile)
  { 
    if (profile.userId && profile.userId != '') {
      this.updateProfile(profile.userId, profile);
    }
    else {
      this.addProfile(profile);
    }
  }

  addProfile(data: Profile) {
    this.profileSvc.addProfile(data).subscribe(response => {
      this.getProfileList();
      this.clearProfile();
      this.openSnackBar("Profile Added!","ok");
    },
    error => {
      console.log(error)
    });
  }
  
  updateProfile(id: number, data: Profile) {
    this.profileSvc.updateProfileById(id, data).subscribe(response => {
      this.getProfileList();
      this.clearProfile();
      this.openSnackBar("Profile Updated!","ok");
    },
    error => {
      console.log(error)
    });
  }
}
