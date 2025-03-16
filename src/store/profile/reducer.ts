import profileActions from "./actions";

const INITIAL_DATA = {
  data:null,
};
export default function profileReducer(state = INITIAL_DATA, action) {
  switch (action.type) {
    case profileActions.FETCH_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case profileActions.REMOVE_PROFILE_DATA:
      return {
data:null
      };
    default:
      return state;
  }
}
