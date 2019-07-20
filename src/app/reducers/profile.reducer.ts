import {
  ActionReducerMap, createReducer, on
} from '@ngrx/store';
import { Profile, initProfile } from '../models/profile';
import { ProfileActions } from './action-types';

export interface ProfileState {
  activeProfileIndex: number,
  profileList: Profile[]
}

export const initProfileState: ProfileState = {
  activeProfileIndex: -1,
  profileList: []
}

// export const reducers: ActionReducerMap<ProfileState> = {

// };

export const profileReducer = createReducer(
  initProfileState,
  on(ProfileActions.loadProfileList, (state, action) => {
    return Object.assign({}, state, {profileList: action.profileList});
  }),
  on(ProfileActions.retrieveProfile, (state, action) => {
    return Object.assign({}, state, {activeProfileIndex: action.activeProfileIndex});
  }),
  on(ProfileActions.clearProfile, (state, action) => {
    return Object.assign({}, state, {activeProfileIndex: -1});
  })
)
