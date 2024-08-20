import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";
import "../../styles/components/CameraAndUpload.css";

export interface ICameraAndUploadProps {
  photoSrc: string | null;
  setPhotoSrc: (photo: string | null) => void;
  imgProccess: (formData: FormData) => Promise<any>; // TODO: change when knowing what backend returns
  resultSetter: (results: string[]) => void;
  isCropping: boolean;
  setIsCropping: (val: boolean) => void;
  cropRatio?: number;
}

const CameraAndUpload: React.FC<ICameraAndUploadProps> = ({
  photoSrc,
  setPhotoSrc,
  imgProccess,
  resultSetter,
  isCropping,
  setIsCropping,
  cropRatio = 1,
}) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

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
            setIsCropping(true);

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

  const handleSave = async () => {
    if (!photoSrc || !croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(photoSrc, croppedAreaPixels);
      setPhotoSrc(URL.createObjectURL(croppedImage)); // Update photoSrc with the cropped image
      setIsCropping(false); // Exit cropping mode
    } catch (error) {
      console.error(error);
    }
  };

  const handleCropAndAnalyze = async () => {
    if (!photoSrc || !croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(photoSrc, croppedAreaPixels);
      const formData = new FormData();
      formData.append("file", croppedImage);

      const response = await imgProccess(formData);
      resultSetter(Array.isArray(response) ? response : [response]);
      console.log(response);
    } catch (error) {
      console.error(error);
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
      {photoSrc && isCropping && (
        <div className="cropContainer">
          <Cropper
            image={photoSrc}
            crop={crop}
            zoom={zoom}
            aspect={cropRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
          <button
            className="generalButton__primary"
            onClick={handleSave}
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Save
          </button>
        </div>
      )}
      {photoSrc && !isCropping && (
        <div className="photoContainer">
          <img className="photo" src={photoSrc} alt="Captured or Uploaded" />
          <button
            className="generalButton__primary"
            onClick={handleCropAndAnalyze}
          >
            Analyze
          </button>
        </div>
      )}
    </div>
  );
};

export { CameraAndUpload };
