import React, { useEffect, useState } from "react";
import { Header } from "../components/shared";
import { CameraAndUpload } from "../components/Identifying";
import "../styles/components/Identifying.css";
import allClassifications from "../assets/classification.json";

const Identifying: React.FC = () => {
  const [classification, setClassification] = useState<string>();
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (photoSrc) {
      setClassification("1");
    }
  }, [photoSrc]);

  return (
    <div className="identifying">
      <Header />
      {!(classification && photoSrc) ? (
        <div className="identifying__container">
          <p className="identifying__subTitle">Identifying Your Skin</p>
          <CameraAndUpload photoSrc={photoSrc} setPhotoSrc={setPhotoSrc} />
        </div>
      ) : (
        <div className="identifying__container">
          <img
            className="identifying__photo"
            src={photoSrc}
            alt="Captured or Uploaded"
          />
          <p className="identifying__subTitle">
            {allClassifications.find((c) => c.value === classification)?.label}
          </p>
          <p className="identifying__description">
            {
              allClassifications.find((c) => c.value === classification)
                ?.description
            }
          </p>
          <button className="generalButton__primary">
            Recommend me a product!
          </button>
        </div>
      )}
      <button className="generalButton__secondary">Check your product</button>
    </div>
  );
};

export { Identifying };
