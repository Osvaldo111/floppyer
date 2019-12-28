import { CHECK_FORM_FILTER } from "../constants/ActionTypes";

const init = {
  checkBoxValueAllJobs: ""
};

export default function(state = init, action) {
  switch (action.type) {
    case CHECK_FORM_FILTER:
      return { checkBoxValueAllJobs: action.checkBoxValueAllJobs };
    default:
      return state;
  }
}
