import axios from "axios";

export const getSkinTypeClassification = async (formData: FormData) => {
  const response = await axios.post(
    "http://localhost:8000/ingredients-list",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
