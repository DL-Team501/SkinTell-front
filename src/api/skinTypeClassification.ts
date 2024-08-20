import axios from 'axios';

export const getSkinTypeClassification = async (
  formData: FormData,
  username: string
) => {
  const response = await axios.post(
    'http://localhost:8001/skin-analysis',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        username,
      },
    }
  );

  return response.data;
};
