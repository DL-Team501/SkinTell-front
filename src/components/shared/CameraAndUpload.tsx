import React from "react";
import "../../styles/components/CameraAndUpload.css";
export interface ICameraAndUploadProps {
  photoSrc: string | null;
  setPhotoSrc: (photo: string | null) => void;
}

const CameraAndUpload: React.FC<ICameraAndUploadProps> = ({
  photoSrc,
  setPhotoSrc,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoSrc(reader.result as string);
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
