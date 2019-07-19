import {
  ActionReducerMap, createReducer, on
} from '@ngrx/store';
import { Profile, initProfile } from '../models/profile';
import { ProfileActions } from './action-types';

export interface ProfileState {
  activeProfile: Profile,
  profileList: Profile[]
}

export const initProfileState: ProfileState = {
  activeProfile: initProfile,
  profileList: []
}

// export const reducers: ActionReducerMap<ProfileState> = {

// };

export const profileListReducer = createReducer(
  initProfileState,
  on(ProfileActions.loadProfileList, (state, action) => {
      debugger;
      return {
          activeProfile: state.activeProfile,
          profileList: action.profileList
      }
  })
)
