import axios from "axios";
import { backendUrl } from "./config";

export const getSkinTypeByIngredients = async (formData: FormData) => {
  const response = await axios.post(
    `${backendUrl}/ingredients-list`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
