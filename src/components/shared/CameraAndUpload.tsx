import React from "react";
import "../../styles/components/CameraAndUpload.css";
export interface ICameraAndUploadProps {
  photoSrc: string | null;
  setPhotoSrc: (photo: string | null) => void;
  imgProccess: (formData: FormData) => Promise<any>; // TODO: change when knowing what backend returns
  resultSetter: (results: string[]) => void;
}

const CameraAndUpload: React.FC<ICameraAndUploadProps> = ({
  photoSrc,
  setPhotoSrc,
  imgProccess,
  resultSetter,
}) => {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader: FileReader = new FileReader();

      reader.onload = async () => {
        try {
          const fileContent: string | ArrayBuffer | null = reader.result;

          if (typeof fileContent === "string") {
            setPhotoSrc(reader.result as string);

            const formData = new FormData();

            formData.append("file", file);

            const response = await imgProccess(formData);
            resultSetter(response);
            console.log(response);
          } else {
            console.error("File content is not a string.");
          }
        } catch (error) {
          console.error(error);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="cameraAndUpload">
      <button className="generalButton__primary">
        <label htmlFor="fileInput">Open Camera or Upload Photo</label>
      </button>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {photoSrc && (
        <div className="photoContainer">
          <img className="photo" src={photoSrc} alt="Captured or Uploaded" />
        </div>
      )}
    </div>
  );
};

// export { CameraAndUpload };
export { CameraAndUpload };
