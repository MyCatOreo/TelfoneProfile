import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from './../../models/profile';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.sass']
})
export class ProfileListComponent implements OnInit {

  @Input() profileList: Profile[];

  @Output() profileSelect = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  selectProfile(id:number) {
    this.profileSelect.emit(id);
  }

}
