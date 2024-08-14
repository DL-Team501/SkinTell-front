import React, { useMemo, useState } from "react";
import { CameraAndUpload, Header } from "../components/shared";
import allClassifications from "../assets/classification.json";
import { useNavigate } from "react-router-dom";
import "../styles/components/Identifying.css";
import { getSkinTypeClassification } from "../api/skinTypeClassification";

const Identifying: React.FC = () => {
  const [classification, setClassification] = useState<string[]>();
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
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

  return (
    <div className="identifying">
      <Header />
      {!(classification && photoSrc) ? (
        <div className="identifying__container">
          {!isCropping && (
            <>
              <p className="generalTitle generalText">Identifying Your Skin</p>
              <p className="generalText ">
                Take or upload a picture of your face
              </p>
            </>
          )}
          <CameraAndUpload
            photoSrc={photoSrc}
            setPhotoSrc={setPhotoSrc}
            imgProccess={getSkinTypeClassification}
            resultSetter={setClassification}
            isCropping={isCropping}
            setIsCropping={setIsCropping}
          />
        </div>
      ) : (
        <div className="identifying__container">
          <img
            className="identifying__photo"
            src={photoSrc}
            alt="Captured or Uploaded"
          />
          <p className="generalTitle generalText">
            {displayedCalssification?.label}
          </p>
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
