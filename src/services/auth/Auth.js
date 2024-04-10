import axiosInstanceAuth from "../../apis/Auth.js";

const AuthAPI = {
  Login: (data) => axiosInstanceAuth().post("auth/local", data),
};
export default AuthAPI;
