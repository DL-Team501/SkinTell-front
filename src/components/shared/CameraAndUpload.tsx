import React, { useState, useCallback, useRef, useEffect } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage';
import '../../styles/components/CameraAndUpload.css';
import {
  AiOutlineCamera,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineScissor,
} from 'react-icons/ai';

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
  cropRatio,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [aspectRation, setAspectRatio] = useState<number>();

  useEffect(() => {
    if (cropRatio) {
      setAspectRatio(cropRatio);
    }
  }, [cropRatio]);

  useEffect(() => {
    if (!photoSrc || aspectRation) return;

    const img = new Image();
    img.src = photoSrc;
    img.onload = () => {
      setAspectRatio(img.width / img.height);
    };
  }, [photoSrc, aspectRation]);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const fileContent = reader.result;
        if (typeof fileContent === 'string') {
          setPhotoSrc(fileContent);
          setIsCropping(!isCropping);
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
      formData.append('file', croppedImage);

      const response = await imgProccess(formData);
      resultSetter(Array.isArray(response) ? response : [response]);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="cameraAndUpload">
      {
        <div>
          <button
            className="iconButton__primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <AiOutlineCamera size={'small'} />
          </button>
          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
      }
      {photoSrc && isCropping && (
        <div className="cropContainer">
          <Cropper
            image={photoSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRation}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
          <button className="iconButton__primary save" onClick={handleSave}>
            <AiOutlineScissor size={'small'} />
          </button>
        </div>
      )}
      {photoSrc && !isCropping && (
        <div className="photoContainer">
          <img className="photo" src={photoSrc} alt="Captured or Uploaded" />
          <div>
            <button
              className="iconButton__primary"
              onClick={handleCropAndAnalyze}
              style={{ marginRight: '10px' }}
            >
              <AiOutlineCheck size={'small'} />
            </button>
            <button
              className="iconButton__primary"
              onClick={() => setIsCropping(true)}
            >
              <AiOutlineClose size={'small'} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { CameraAndUpload };
