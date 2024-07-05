import axios from "axios";

export const getSkinTypeClassification = async (formData: FormData) => {
  const response = await axios.post(
    "http://localhost:3000/skin-analysis",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
