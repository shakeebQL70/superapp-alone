import { axios, endPoints } from "./service";

export const uploadFileToS3 = async (url: string, formData: File) => {
  let response = "";
  let isError = true;
  let msg = "Something went wrong";
  try {
    response = await axios.putMethod(url, formData);
    console.log({ formData });

    if (response) {
      isError = false;
      msg = "";
    }
  } catch (error) {
    // isError = true;
    // msg = "Something went wrong";
  }
  return {
    response,
    isError,
    msg,
  };
};

export const getURLForFile = async (fileName: string, file: File) => {
  let uploadResponse = null;
  let isError = true;
  let msg = "Something went wrong";
  try {
    const response = await axios.getMethod(
      `${endPoints.uploadFile}?filename=${fileName}`
    );
    if (response?.signed_url) {
      const {
        response: res,
        isError: err,
        msg: message,
      }: any = uploadFileToS3(response?.signed_url, file);
      isError = err;
      msg = message;
      uploadResponse = res;
    }
  } catch (error) {}

  return {
    response: uploadResponse,
    isError,
    msg,
  };
};

export const FILE_BASE_URL =
  "https://dev-edique-backend.s3.amazonaws.com/local/";
