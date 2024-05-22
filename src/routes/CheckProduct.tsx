import React, { useEffect, useState } from "react";
import { CameraAndUpload, Header } from "../components/shared";
import { useNavigate } from "react-router-dom";
import "../styles/components/CheckProduct.css";
import { SkinTypes } from "../generalTypes";

const CheckProduct: React.FC = () => {
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [matchSkinTypes, setMatchSkinTypes] = useState<SkinTypes[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (photoSrc) {
      setMatchSkinTypes([SkinTypes.dry, SkinTypes.normal]);
    }
  }, [photoSrc]);

  return (
    <div className="checkProduct">
      <Header />

      {!photoSrc ? (
        <div className="checkProduct__container">
          <span className="generalText">
            Take a picture of your product's ingredients list
          </span>
          <CameraAndUpload photoSrc={photoSrc} setPhotoSrc={setPhotoSrc} />
        </div>
      ) : (
        <div className="checkProduct__container">
          <img
            className="checkProduct__photo"
            src={photoSrc}
            alt="Captured or Uploaded"
          />
          <span className="generalText generalTitle">
            Skintelligent Recommends:
          </span>
          <div className="checkProduct__skinTypesList">
            {Object.values(SkinTypes).map((type) => (
              <div className="checkProduct__skinTypesItem">
                <span className="checkProduct__skinTypesClass">
                  {matchSkinTypes.includes(type) ? "V" : "X"}
                </span>
                <span className="checkProduct__skinTypesText">{type}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { CheckProduct };
