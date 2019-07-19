import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

    static SCOPE_KEY = 'neixingren_at_gmail_com';

    constructor(private http: HttpClient) {}

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

}