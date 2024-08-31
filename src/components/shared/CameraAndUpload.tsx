import React, { useState, useCallback, useRef } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import Webcam from 'react-webcam';
import getCroppedImg from '../../utils/cropImage';
import '../../styles/components/CameraAndUpload.css';

const videoConstraints = {
  width: 540,
  facingMode: 'user',
};

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
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);

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

  const openCamera = () => setIsCameraOpen(true);

  const capturePhoto = useCallback(async () => {
    if (webcamRef.current === null) return;

    const imageSrc = webcamRef.current.getScreenshot();
    setPhotoSrc(imageSrc);
    setIsCameraOpen(false);
    setIsCropping(true);
  }, [webcamRef, setPhotoSrc, setIsCameraOpen, setIsCropping]);

  const onUserMedia = (e: any) => {
    console.log(e);
  };

  return (
    <div className='cameraAndUpload'>
      {!isCameraOpen && (
        <>
          <button
            onClick={openCamera}
            className='generalButton__primary'
            style={{ marginRight: '10px' }}
          >
            Open Camera
          </button>
          <button className='generalButton__primary'>
            <label htmlFor='fileInput'>Upload Photo</label>
          </button>
          <input
            id='fileInput'
            type='file'
            accept='image/*'
            capture='environment'
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </>
      )}
      {isCameraOpen && (
        <>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat='image/jpeg'
            videoConstraints={videoConstraints}
            onUserMedia={onUserMedia}
          />{' '}
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={capturePhoto} className='generalButton__primary'>
              Capture Photo
            </button>
          </div>
        </>
      )}
      {photoSrc && isCropping && (
        <div className='cropContainer'>
          <Cropper
            image={photoSrc}
            crop={crop}
            zoom={zoom}
            aspect={cropRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
          <button className='generalButton__primary save' onClick={handleSave}>
            Save
          </button>
        </div>
      )}
      {photoSrc && !isCropping && (
        <div className='photoContainer'>
          <img className='photo' src={photoSrc} alt='Captured or Uploaded' />
          <button
            className='generalButton__primary'
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
