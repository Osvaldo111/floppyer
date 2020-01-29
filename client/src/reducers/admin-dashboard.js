import { CHECK_ADMIN_LOGOUT } from "../constants/ActionTypes";

const init = {
  isLogoutPress: false
};
export default function(state = init, action) {
  switch (action.type) {
    case CHECK_ADMIN_LOGOUT:
      return { isLogoutPress: action.isLogoutPress };
    default:
      return state;
  }
}
