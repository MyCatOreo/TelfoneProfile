import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProfileState } from './profile.reducer';
import { initProfile } from '../models/profile';

export const selectProfileState = createFeatureSelector<ProfileState>('profileReducer')

export const profileList = createSelector(
    selectProfileState,
    (profileState) => profileState.profileList
)
export const profile = createSelector(
    selectProfileState,
    (profileState) => profileState.profileList[profileState.activeProfileIndex] || initProfile
)