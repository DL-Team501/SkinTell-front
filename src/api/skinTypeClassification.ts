import axios from "axios";
import { backendUrl } from "./config";

export const getSkinTypeClassification = async (
  formData: FormData,
  username: string
) => {
  const response = await axios.post(`${backendUrl}/skin-analysis`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      username,
    },
  });

  return response.data;
};
