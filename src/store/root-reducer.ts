import { combineReducers } from "redux";
import App from "store/app/reducer";
import Auth from "store/auth/reducer";
import LanguageSwitcher from "store/languageSwitcher/reducer";
import ThemeSwitcher from "store/themeSwitcher/reducer";
import crumbReducer from "store/crumb/reducer";
import modal from "store/modal/reducer";
import profile from "store/profile/reducer";

export default combineReducers({
  Auth,
  App,
  LanguageSwitcher,
  modal,
  profile,
  crumbReducer,
  ThemeSwitcher
  
});
