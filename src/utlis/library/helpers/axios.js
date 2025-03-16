import axios from "axios";
import { store } from "store/store";
import authAction from "store/auth/actions";

const { setTokenAsExpired } = authAction;

// import { store } from "../../redux/store";
export const URL = "https://secop-backend.deplanagency.com"; // ==> dev

const instance = axios.create({
  baseURL: `${URL}/api/admin`,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem("idToken")}`,
    // "X-Language": store.getState()?.LanguageSwitcher?.language?.locale ?? "en",
  },
});

instance.interceptors.request.use((req) => {
  return req;
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },

  (err) => {
    console.log(err.response.config)
    if (
      err &&
      err.response &&
      err.response.status === 403 &&
      err.response.config.url !== "login"
    ) {
      // window.localStorage.removeItem("mitcvAdminToken");
      // window.location.replace("/");
    } else if (
      err.response.status === 401 &&
      err.response.config.url !== "login"
    ) {
      if(store.getState().Auth.status!=="EXPIRED"){

        store.dispatch(setTokenAsExpired())
      }
      // window.localStorage.removeItem("mitcvAdminToken");
      // window.location.replace("/");
    } 
    return Promise.reject(err);
  }
);

export default instance;
