import { combineReducers } from "redux";
import adminDashboard from "./admin-dashboard";
import searchBox from "./searchBox";
import checkBoxFilter from "./checkBox-filter";

const rootReducer = combineReducers({
  adminDashboard,
  searchBox,
  checkBoxFilter
});

export default rootReducer;
