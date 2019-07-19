import {createAction, props} from '@ngrx/store';
import { Profile } from './../models/profile';

export const loadProfileList = createAction("[Profile Page] Load Profile List", props<{profileList: Profile[]}>());
export const clearProfile = createAction("[Profile Form] Clear Profile");

// export const LOAD_PROFILE = 'LOAD_PROFILE';
// export const CLEAR_PROFILE = 'CLEAR_PROFILE';
// export const SUBMIT_PROFILE = "SUBMIT_PROFILE";

// export const UPDATE_PROFILE_FIRST_NAME = 'UPDATE_PROFILE_FIRST_NAME';
// export const UPDATE_PROFILE_LAST_NAME = 'UPDATE_PROFILE_LAST_NAME';
// export const UPDATE_PROFILE_DISPLAY_NAME = 'UPDATE_PROFILE_DISPLAY_NAME';