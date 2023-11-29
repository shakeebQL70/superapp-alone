import { NewAxios } from "AXIOS/axios";
import { $LOCAL_LOGGEDIN_KEY } from "../Store/contants";

const user = JSON.parse(localStorage.getItem($LOCAL_LOGGEDIN_KEY) || "{}")
  ?.state?.user;

export const axios = new NewAxios(
  "https://apis-edique.qkkalabs.com/api/v1/",
  `Bearer ${user?.accessToken}`
);

export const endPoints = {
  login: "user/login",
  project: "opms/project",
  teacher: "teacher",
  students: "student",
  studentDetails: "student/details",
  schools: "opms/school/project",
  schoolMono: "opms/school",
  labUsage: "lab-usage",
  users: "users",
  user: "user",
  userCreate: "user/create",
  bankDetails: "user/bank-details",
  qualification: "user/qualification",
  experience: "user/experience",
  uploadFile:
    "https://75xpmhkhcb.execute-api.us-east-2.amazonaws.com/signed-url-upload",
  visitors: "visitor",
  dcVisitor: "visitor/dc-visitor",
  asset: "asset",
  serviceDesk: "service-desk",
  faq: "faq",
  labAsset: 'asset',
  training: 'teacher-training'
};
