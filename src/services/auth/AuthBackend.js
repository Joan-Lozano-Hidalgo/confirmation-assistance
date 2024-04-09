import axiosInstanceAuth from "api/auth.js";

const AuthAPI = {
  Login: (data) => axiosInstanceAuth().post("/security/authenticate", data),
};
export default AuthAPI;
