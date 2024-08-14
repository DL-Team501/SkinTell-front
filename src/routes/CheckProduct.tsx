import React, { useMemo, useState } from 'react';
import { CameraAndUpload, Header } from '../components/shared';
import { useNavigate } from 'react-router-dom';
import '../styles/components/CheckProduct.css';
import { SkinTypes } from '../generalTypes';
import { getSkinTypeByIngredients } from '../api/ingredients';
import { getLocalStorageClassification } from '../util/localstorage';
import { getClassificationInfo } from '../util/classification';

const CheckProduct: React.FC = () => {
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [matchSkinTypes, setMatchSkinTypes] = useState<string[]>([]); // TODO: change to the backend type
  const classificationLabel = useMemo<string | undefined>(
    () => getClassificationInfo(getLocalStorageClassification()?.[0])?.label,
    []
  );
  const navigate = useNavigate();

  const navToIdentifying = () => {
    navigate('/identifying');
  };

  return (
    <div className='checkProduct'>
      <Header />
      {!classificationLabel && (
        <div className='goBack__container'>
          <span className='generalText'>
            Hi! We see you haven't analyzed your skin yet
          </span>
          <button
            className='generalButton__secondary'
            onClick={navToIdentifying}
          >
            Go Back
          </button>
        </div>
      )}

      {!matchSkinTypes.length ? (
        <div className='checkProduct__container'>
          {classificationLabel ? (
            <span className='generalText'>
              Take a picture of your product's ingredients list, see if you can
              use them with <b>{classificationLabel.toLowerCase()}</b>
            </span>
          ) : (
            <span className='generalText'>
              If you're not intereseted,
              <br />
              Take a picture of your product's ingredients list anyway
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
        <div className='checkProduct__container'>
          <img
            className='checkProduct__photo'
            src={photoSrc!}
            alt='Captured or Uploaded'
          />
          <span className='generalText generalTitle'>
            Skintelligent Recommends:
          </span>
          <div className='checkProduct__skinTypesList'>
            {Object.keys(SkinTypes).map(type => (
              <div className='checkProduct__skinTypesItem'>
                <span className='checkProduct__skinTypesClass'>
                  {matchSkinTypes.includes(type) ? 'V' : 'X'}
                </span>
                <span className='checkProduct__skinTypesText'>{type}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { CheckProduct };
