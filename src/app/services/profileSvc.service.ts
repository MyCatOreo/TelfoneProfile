import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Profile } from '../models/profile';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ProfileState } from './../reducers/profile.reducer';
import { ProfileActions } from 'src/app/reducers/action-types';


@Injectable({
  providedIn: 'root',
})
export class ProfileService {

    static SCOPE_KEY = 'neixingren_at_gmail_com';
    static UPDATE_TIME = 30000;

    constructor(private http: HttpClient, private store: Store<ProfileState>) {}

    getProfileById(id: number): Observable<Profile> {
        return this.http.get<Profile>('https://zware-ngnewapi.azurewebsites.net/api/' + ProfileService.SCOPE_KEY + '/profiles/' + id);
    }

    getProfileAll(): Observable<Profile[]> {
        return this.http.get<Profile[]>('https://zware-ngnewapi.azurewebsites.net/api/' + ProfileService.SCOPE_KEY + '/profiles/');
    }

    addProfile(data: Profile): Observable<{}> {
        return this.http.post('https://zware-ngnewapi.azurewebsites.net/api/' + ProfileService.SCOPE_KEY + '/profiles/', data);
    }

    updateProfileById(id: number, data: Profile): Observable<{}> {
        return this.http.put('https://zware-ngnewapi.azurewebsites.net/api/' + ProfileService.SCOPE_KEY + '/profiles/' + id, data);
    }

    profileListAutoUpdate() {
        return interval(ProfileService.UPDATE_TIME).pipe(
            map(() => this.getProfileAll().subscribe(response => {
            //  alert("new data");
              this.store.dispatch(ProfileActions.loadProfileList({profileList: response}));
            },
            error => {
              console.log(error);
            })
            )
        );
    }

}