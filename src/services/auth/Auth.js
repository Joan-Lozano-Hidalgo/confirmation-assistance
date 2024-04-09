import axiosInstanceAuth from "../../apis/Auth.js";

const AuthAPI = {
  Login: (data) => axiosInstanceAuth().post("/security/authenticate", data),
};
export default AuthAPI;
