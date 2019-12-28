import { GET_SEARCH_BOX_DATA } from "../constants/ActionTypes";

const init = {
  searchBoxData: ""
};
export default function(state = init, action) {
  switch (action.type) {
    case GET_SEARCH_BOX_DATA:
      return { searchBoxData: action.searchBoxData };
    default:
      return state;
  }
}
