import axios from "axios";
import { backendUrl } from "./config";

export const getSkinTypeClassification = async (formData: FormData) => {
  const response = await axios.post(`${backendUrl}/skin-analysis`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
