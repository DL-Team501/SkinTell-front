import React, { useMemo, useState } from 'react';
import { CameraAndUpload, Header } from '../components/shared';
import { useNavigate } from 'react-router-dom';
import '../styles/components/CheckProduct.css';
import { ProductSkinConditions, ProductSkinTypes } from '../generalTypes';
import { getSkinTypeByIngredients } from '../api/ingredients';
import { getClassificationInfo } from '../util/classification';
import { useRecoilValue } from 'recoil';
import { classificationState } from '../atoms/classification.atom';
import { FaCheck } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { faceTypeToProductTypeMapping } from '../util/faceAndProductMapping';
import { getCommonValues } from '../util/util';

const CheckProduct: React.FC = () => {
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [matchSkinTypes, setMatchSkinTypes] = useState<string[] | null>(null);
  const classification = useRecoilValue(classificationState);
  const classificationLabel = useMemo<string | undefined>(
    () => getClassificationInfo(classification?.[0])?.label,
    [classification]
  );
  const classificationValue = useMemo<string | undefined>(
    () => getClassificationInfo(classification?.[0])?.value,
    [classification]
  );

  const navigate = useNavigate();
  const [isCropping, setIsCropping] = useState(false);

  const navToIdentifying = () => {
    navigate('/identifying');
  };

  const updateMatchingSkinTypes = (skinTypes: string[]) => {
    setMatchSkinTypes([
      ...new Set(
        skinTypes.map((currSkinType) =>
          currSkinType === 'oiliness'
            ? 'oily'
            : currSkinType === 'dryness'
            ? 'dry'
            : currSkinType === 'dark'
            ? 'dark circle'
            : currSkinType
        )
      ),
    ]);
  };

  const getRecommendationMessage = () => {
    const commonTypes: string[] = getCommonValues(
      faceTypeToProductTypeMapping[classificationValue!],
      matchSkinTypes!
    );
    let text: string = '';
    const matchedFaceTypes: string[] = [];
    const matchedFaceConditions: string[] = [];
    const skinTypeKeys = Object.keys(ProductSkinTypes) as string[];
    const skinConditionKeys = Object.keys(ProductSkinConditions) as string[];

    commonTypes.forEach((type) => {
      if (skinTypeKeys.includes(type)) matchedFaceTypes.push(type);
      if (skinConditionKeys.includes(type)) matchedFaceConditions.push(type);
    });
    if (matchedFaceTypes.length)
      text = text.concat(matchedFaceTypes.join(', ').concat(' skin, '));
    if (matchedFaceConditions.length)
      text = text
        .concat('skin with '.concat(matchedFaceConditions.join(', ')))
        .concat(', ');

    return `Based on your skin analysis, this product is suitable for 
    ${text} which aligns with your skin condition`;
  };

  return (
    <div className="checkProduct">
      <Header />
      <p className="generalTitle generalText">Check A Product</p>
      {!classificationLabel && (
        <div className="goBack__container">
          <span className="generalText">
            Oh, you haven't analyzed your skin yet...
          </span>
          <button
            className="generalButton__secondary"
            onClick={navToIdentifying}
          >
            Go Back
          </button>
        </div>
      )}

      {!matchSkinTypes ? (
        <div className="checkProduct__container">
          {classificationLabel ? (
            <span className="generalText">
              Take a picture of your product's ingredients list
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
            resultSetter={updateMatchingSkinTypes}
            isCropping={isCropping}
            setIsCropping={setIsCropping}
          />
        </div>
      ) : (
        <div className="checkProduct__container">
          <img
            className="checkProduct__photo"
            src={photoSrc!}
            alt="Captured or Uploaded"
          />
          <span className="generalText generalTitle">Match for skin type:</span>
          <div className="checkProduct__skinTypesList">
            {Object.keys(ProductSkinTypes).map((type) => (
              <div className="checkProduct__skinTypesItem" key={type}>
                <span className="checkProduct__skinTypesClass">
                  {matchSkinTypes.includes(type) ? (
                    <FaCheck style={{ color: 'green', fontSize: '1em' }} />
                  ) : (
                    <AiOutlineClose style={{ color: 'red', fontSize: '1em' }} />
                  )}
                </span>
                <span className="checkProduct__skinTypesText">
                  {ProductSkinTypes[type as keyof typeof ProductSkinTypes]}
                </span>
              </div>
            ))}
          </div>
          {getCommonValues(Object.keys(ProductSkinConditions), matchSkinTypes)
            .length ? (
            <>
              <span className="generalText generalTitle">
                Match for skin condition:
              </span>
              <div className="checkProduct__skinTypesList">
                {Object.keys(ProductSkinConditions).map((type) => (
                  <div className="checkProduct__skinTypesItem" key={type}>
                    <span className="checkProduct__skinTypesClass">
                      {matchSkinTypes.includes(type) ? (
                        <FaCheck style={{ color: 'green', fontSize: '1em' }} />
                      ) : (
                        <AiOutlineClose
                          style={{ color: 'red', fontSize: '1em' }}
                        />
                      )}{' '}
                    </span>
                    <span className="checkProduct__skinTypesText">
                      {
                        ProductSkinConditions[
                          type as keyof typeof ProductSkinConditions
                        ]
                      }
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <></>
          )}
          {classificationValue &&
          matchSkinTypes &&
          getCommonValues(
            faceTypeToProductTypeMapping[classificationValue],
            matchSkinTypes
          ).length ? (
            <span className="generalText generalTitle">
              {getRecommendationMessage()}
            </span>
          ) : (
            <> </>
          )}
        </div>
      )}
    </div>
  );
};

export { CheckProduct };
