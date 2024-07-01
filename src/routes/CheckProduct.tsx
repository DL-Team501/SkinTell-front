import React, { useState } from "react";
import { CameraAndUpload, Header } from "../components/shared";
import { useNavigate } from "react-router-dom";
import "../styles/components/CheckProduct.css";
import { SkinTypes } from "../generalTypes";
import { getSkinTypeByIngredients } from "../api/ingredients";

const CheckProduct: React.FC = () => {
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [matchSkinTypes, setMatchSkinTypes] = useState<string[]>([]); // TODO: change to the backend type
  const navigate = useNavigate();

  return (
    <div className="checkProduct">
      <Header />

      {!matchSkinTypes.length ? (
        <div className="checkProduct__container">
          <span className="generalText">
            Take a picture of your product's ingredients list
          </span>
          <CameraAndUpload
            photoSrc={photoSrc}
            setPhotoSrc={setPhotoSrc}
            imgProccess={getSkinTypeByIngredients}
            resultSetter={setMatchSkinTypes}
          />
        </div>
      ) : (
        <div className="checkProduct__container">
          <img
            className="checkProduct__photo"
            src={photoSrc!}
            alt="Captured or Uploaded"
          />
          <span className="generalText generalTitle">
            Skintelligent Recommends:
          </span>
          <div className="checkProduct__skinTypesList">
            {Object.keys(SkinTypes).map((type) => (
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
