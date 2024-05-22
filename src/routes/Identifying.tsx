import React, { useEffect, useState } from "react";
import { CameraAndUpload, Header } from "../components/shared";
import allClassifications from "../assets/classification.json";
import { useNavigate } from "react-router-dom";
import "../styles/components/Identifying.css";

const Identifying: React.FC = () => {
  const [classification, setClassification] = useState<string>();
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (photoSrc) {
      setClassification("1");
    }
  }, [photoSrc]);

  const navToRecommendation = () => {
    navigate("/recommendation");
  };

  const navToCheckProduct = () => {
    navigate("/checkProduct");
  };

  return (
    <div className="identifying">
      <Header />
      {!(classification && photoSrc) ? (
        <div className="identifying__container">
          <p className="generalTitle generalText">Identifying Your Skin</p>
          <p className="generalText">Take or upload a picture of your face</p>
          <CameraAndUpload photoSrc={photoSrc} setPhotoSrc={setPhotoSrc} />
        </div>
      ) : (
        <div className="identifying__container">
          <img
            className="identifying__photo"
            src={photoSrc}
            alt="Captured or Uploaded"
          />
          <p className="generalTitle generalText">
            {allClassifications.find((c) => c.value === classification)?.label}
          </p>
          <p className="generalText">
            {
              allClassifications.find((c) => c.value === classification)
                ?.description
            }
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
