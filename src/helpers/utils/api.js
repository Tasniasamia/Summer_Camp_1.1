import { get } from "./axios";
//class
export const getAllClass = (params = {}) => get("/class/site", params);
//category
export const getAllCategory=(params={})=>get("/class/category",params);

//users
export const getAllUser=(params={})=>get("/user",params);

//authentications 
export const sendOTP = (params = {}) => post("/otp/send", params);
