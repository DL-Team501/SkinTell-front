import React, { useMemo, useState } from 'react';
import { CameraAndUpload, Header } from '../components/shared';
import { useNavigate } from 'react-router-dom';
import '../styles/components/CheckProduct.css';
import { SkinTypes } from '../generalTypes';
import { getSkinTypeByIngredients } from '../api/ingredients';
import { getClassificationInfo } from '../util/classification';
import { useRecoilValue } from 'recoil';
import { classificationState } from '../atoms/classification.atom';

const CheckProduct: React.FC = () => {
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [matchSkinTypes, setMatchSkinTypes] = useState<string[]>([]); // TODO: change to the backend type
  const classification = useRecoilValue(classificationState);
  const classificationLabel = useMemo<string | undefined>(
    () => getClassificationInfo(classification?.[0])?.label,
    [classification]
  );
  const navigate = useNavigate();

  const navToIdentifying = () => {
    navigate('/identifying');
  };

  return (
    <div className="checkProduct">
      <Header />
      <p className="generalTitle generalText">Check A Product</p>
      {!classificationLabel && (
        <div className="goBack__container">
          <span className="generalText">
            Oh, you haven't analyzed your skin yet!
          </span>
          <button
            className="generalButton__secondary"
            onClick={navToIdentifying}
          >
            Go Back
          </button>
        </div>
      )}

      {!matchSkinTypes.length ? (
        <div className="checkProduct__container">
          {classificationLabel ? (
            <span className="generalText">
              Take a picture of your product's ingredients list!
              <br />
              <br />
              Lets see if it fits with{' '}
              <b>{classificationLabel.toLowerCase()}</b>
            </span>
          ) : (
            <span className="generalText">
              <b>or</b>
              <br />
              <br />
              Check your product's ingredients list anyway
            </span>
          )}
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
                  {matchSkinTypes.includes(type) ? 'V' : 'X'}
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
