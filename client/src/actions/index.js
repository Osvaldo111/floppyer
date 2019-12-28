import * as types from "../constants/ActionTypes";

export const checkAdminLogout = isLogoutPress => ({
  type: types.CHECK_ADMIN_LOGOUT,
  isLogoutPress
});

export const setSearchBoxData = searchBoxData => ({
  type: types.GET_SEARCH_BOX_DATA,
  searchBoxData
});

export const setCheckBoxValue = checkBoxValueAllJobs => ({
  type: types.CHECK_FORM_FILTER,
  checkBoxValueAllJobs
});
