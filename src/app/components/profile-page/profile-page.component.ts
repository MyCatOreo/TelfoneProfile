import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../../services/profileSvc.service';
import { Profile, initProfile } from './../../models/profile';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.sass']
})
export class ProfilePageComponent implements OnInit {

  profileList: Profile[];
  activeProfile: Profile;

  constructor(private profileSvc: ProfileService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getProfileList();
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
    this.profileSvc.getProfileById(id).subscribe(response => {
      this.activeProfile = response;
      console.log(this.activeProfile);
    },
    error => {
      console.log(error);
    });
  }

  getProfileList() {
    this.profileSvc.getProfileAll().subscribe(response => {
      this.profileList = response;
      console.log(this.profileList);
    },
    error => {
      console.log(error);
    });
  } 

  clearProfile() {
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
    console.log(profile);
    if (profile.userId && profile.userId != '') {
      this.updateProfile(profile.userId, profile);
    }
    else {
      this.addProfile(profile);
    }
  }


}
