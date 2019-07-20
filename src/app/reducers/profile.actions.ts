import {createAction, props} from '@ngrx/store';
import { Profile } from './../models/profile';

export const loadProfileList = createAction("[Profile Page] Load Profile List", props<{profileList: Profile[]}>());
export const retrieveProfile = createAction("[Profile Page] Retrieve Profile", props<{activeProfileIndex: number | undefined}>());
export const clearProfile = createAction("Clear Profile");