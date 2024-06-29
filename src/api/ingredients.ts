import axios from "axios";

export const getSkinTypeByIngredients = async (formData: FormData) => {
  const response = await axios.post(
    "http://localhost:8001/ingredients-list",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
