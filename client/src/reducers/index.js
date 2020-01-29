import { combineReducers } from "redux";
import adminDashboard from "./admin-dashboard";
import searchBox from "./searchBox";

const rootReducer = combineReducers({
  adminDashboard,
  searchBox
});

export default rootReducer;
