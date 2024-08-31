import React, { useMemo, useState } from 'react';
import { CameraAndUpload, Header } from '../components/shared';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Identifying.css';
import { getSkinTypeClassification } from '../api/skinTypeClassification';
import { getClassificationInfo } from '../util/classification';
import { useRecoilState, useRecoilValue } from 'recoil';
import { usernameState } from '../atoms/username.atom';
import { classificationState } from '../atoms/classification.atom';

const Identifying: React.FC = () => {
  const [classification, setClassification] =
    useRecoilState(classificationState);
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [isNewClassification, setIsNewClassification] = useState(false);
  const [heatmap, setHeatmap] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const username = useRecoilValue(usernameState);
  const navigate = useNavigate();

  const navToRecommendation = () => {
    navigate('/recommendation');
  };

  // const navToCheckProduct = () => {
  //   navigate('/checkProduct');
  // };

  const displayedClassification = useMemo(
    () => getClassificationInfo(classification?.[0]),
    [classification]
  );

  const getClassification = async (formData: FormData) => {
    const { predicted_class, heatmap } = await getSkinTypeClassification(
      formData,
      username
    );

    setHeatmap(heatmap);
    setIsNewClassification(true);

    return [predicted_class];
  };

  return (
    <div className="identifying">
      <Header />
      {!(classification && isNewClassification) && (
        <div className="identifying__container">
          <>
            <p className="generalTitle generalText">
              Identify Your Facial Skin Condition
            </p>
            {classification && (
              <>
                <p className="generalText ">
                  From your profile history, it looks you have{' '}
                  <b>{displayedClassification?.label?.toLowerCase()}</b>.
                  <br />
                  <br />
                  Classify your face again?
                </p>
              </>
            )}
          </>
          {!isNewClassification && (
            <CameraAndUpload
              photoSrc={photoSrc}
              setPhotoSrc={setPhotoSrc}
              imgProccess={getClassification}
              resultSetter={setClassification}
              isCropping={isCropping}
              setIsCropping={setIsCropping}
              cropRatio={1}
            />
          )}
        </div>
      )}
      {photoSrc && classification && isNewClassification && (
        <div className="identifying__container">
          <img
            className="identifying__photo"
            src={photoSrc}
            alt="Captured or Uploaded"
          />
          {heatmap && showHeatmap && (
            <img
              className="identifying__photo heatmap"
              src={`data:image/jpeg;base64,${heatmap}`}
              alt="heatmap"
            />
          )}
          <div className="classification__title">
            <p className="generalTitle generalText">
              {displayedClassification?.label}
            </p>
            {showHeatmap ? (
              <button
                className="why__button"
                onClick={() => setShowHeatmap(false)}
              >
                Got it!
              </button>
            ) : (
              <button
                className="why__button"
                onClick={() => setShowHeatmap(true)}
              >
                Why?
              </button>
            )}
          </div>
          <p className="generalText calssification__description">
            {displayedClassification?.description}
          </p>
          <button
            className="generalButton__primary"
            onClick={navToRecommendation}
          >
            Recommend me a product!
          </button>
        </div>
      )}
      {/* <button className="generalButton__secondary" onClick={navToCheckProduct}>
        Check your product
      </button> */}
    </div>
  );
};

export { Identifying };
