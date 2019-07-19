import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../../services/profileSvc.service';
import { Profile } from './../../models/profile';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.sass']
})
export class ProfilePageComponent implements OnInit {

  profileList: Profile[];
  activeProfile: Profile;

  testData = {
    email: "test1@t.t",
    firstName: "string",
    lastName: "string",
    displayName: "string",
    description: "string",
    department: "string",
    team: "string"
  }

  testData2 = {
    userId: 159,
    email: "test2@t.t",
    firstName: "string",
    lastName: "string",
    displayName: "string",
    description: "string",
    department: "string",
    team: "string"
  }

  constructor(private profileSvc: ProfileService) { }

  ngOnInit() {
    this.getProfileList();
  }

  addProfile(data: Profile) {
    this.profileSvc.addProfile(data).subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error)
    });
  }

  updateProfile(id: number, data: Profile) {
    this.profileSvc.updateProfileById(id, data).subscribe(response => {
      console.log(response);
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


  onProfileSelected(ev) {
    console.log(ev);
  }

  onProfileSumbitted(ev)
  {
    console.log(ev);
  
  }


}
