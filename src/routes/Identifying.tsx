import React, { useMemo, useState } from "react";
import { CameraAndUpload, Header } from "../components/shared";
import allClassifications from "../assets/classification.json";
import { useNavigate } from "react-router-dom";
import "../styles/components/Identifying.css";
import { getSkinTypeClassification } from "../api/skinTypeClassification";

const Identifying: React.FC = () => {
  const [classification, setClassification] = useState<string[]>();
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [heatmap, setHeatmap] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const navigate = useNavigate();

  const navToRecommendation = () => {
    navigate("/recommendation");
  };

  const navToCheckProduct = () => {
    navigate("/checkProduct");
  };

  const displayedCalssification = useMemo(
    () => allClassifications.find((c) => c.value === classification?.[0]),
    [classification]
  );

  const getClassification = async (formData: FormData) => {
    const { predicted_class, heatmap } = await getSkinTypeClassification(
      formData
    );

    setHeatmap(heatmap);

    return [predicted_class];
  };

  return (
    <div className="identifying">
      <Header />
      {!(classification && photoSrc) ? (
        <div className="identifying__container">
          <p className="generalTitle generalText">Identifying Your Skin</p>
          <p className="generalText ">Take or upload a picture of your face</p>
          <CameraAndUpload
            photoSrc={photoSrc}
            setPhotoSrc={setPhotoSrc}
            imgProccess={getClassification}
            resultSetter={setClassification}
          />
        </div>
      ) : (
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
              {displayedCalssification?.label}
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
            {displayedCalssification?.description}
          </p>
          <button
            className="generalButton__primary"
            onClick={navToRecommendation}
          >
            Recommend me a product!
          </button>
        </div>
      )}
      <button className="generalButton__secondary" onClick={navToCheckProduct}>
        Check your product
      </button>
    </div>
  );
};

export { Identifying };
