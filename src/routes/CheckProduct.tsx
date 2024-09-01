import React, { useEffect, useMemo, useState } from 'react';
import { CameraAndUpload, Header } from '../components/shared';
import '../styles/components/CheckProduct.css';
import { ProductSkinConditions, ProductSkinTypes } from '../generalTypes';
import { getSkinTypeByIngredients } from '../api/ingredients';
import { getClassificationInfo } from '../util/classification';
import { useRecoilValue } from 'recoil';
import { classificationState } from '../atoms/classification.atom';
import { FaCheck } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { LuHeartCrack, LuHeartHandshake } from 'react-icons/lu';
import { IoHeartOutline } from 'react-icons/io5';
import {
  badMatchFaceTypeToProductTypeMapping,
  goodMatchFaceTypeToProductTypeMapping,
} from '../util/faceAndProductMapping';
import { getCommonValues } from '../util/util';
import axios from 'axios';

const CheckProduct: React.FC = () => {
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

  useEffect(() => {
    setErrorMessage(null);
  }, [photoSrc]);

  const [isCropping, setIsCropping] = useState(false);

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

  const proccessIngredientsBySkinType = async (formData: FormData) => {
    try {
      return await getSkinTypeByIngredients(formData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          setErrorMessage(
            'No recognizable ingredients were found. Please provide a clearer image.'
          );
        } else {
          setErrorMessage(
            'Something went wrong, please try again or contact support team'
          );
        }
      } else {
        setErrorMessage(
          'Something went wrong, please try again or contact support team'
        );
      }
      console.error('An error occurred:', error);
    }
  };

  const renderMatchMessage = () => {
    if (classificationValue && matchSkinTypes) {
      if (
        getCommonValues(
          goodMatchFaceTypeToProductTypeMapping[classificationValue],
          matchSkinTypes
        ).length
      ) {
        return (
          <span
            className="generalText generalTitle"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            It's matching your skin &nbsp;
            <LuHeartHandshake />
          </span>
        );
      } else if (
        getCommonValues(
          badMatchFaceTypeToProductTypeMapping[classificationValue],
          matchSkinTypes
        ).length
      ) {
        return (
          <span
            className="generalText generalTitle"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            It's not a good match for you...&nbsp;
            <LuHeartCrack />
          </span>
        );
      } else {
        return (
          <span
            className="generalText generalTitle"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            normal match&nbsp;
            <IoHeartOutline />
          </span>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <div className="checkProduct">
      <Header />
      <p className="generalTitle generalText">Check a Product</p>
      {!classificationLabel && (
        <div className="goBack__container">
          <span className="generalText">
            Be aware, you haven't analyzed your skin yet...
          </span>
        </div>
      )}

      {classificationLabel ? (
        <span className="generalText">
          Take a picture of your product's ingredients list
          <br />
          Lets see if it fits with <b>{classificationLabel.toLowerCase()}</b>
        </span>
      ) : (
        <br />
      )}
      {!matchSkinTypes ? (
        <div className="checkProduct__container">
          <CameraAndUpload
            photoSrc={photoSrc}
            setPhotoSrc={setPhotoSrc}
            imgProccess={proccessIngredientsBySkinType}
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
          {errorMessage ? (
            <div className="generalText" style={{ color: 'red' }}>
              {errorMessage}
            </div>
          ) : (
            <>
              <span className="generalText generalTitle">
                Match for skin type:
              </span>
              <div className="checkProduct__skinTypesList">
                {Object.keys(ProductSkinTypes).map((type) => (
                  <div className="checkProduct__skinTypesItem" key={type}>
                    <span className="checkProduct__skinTypesClass">
                      {matchSkinTypes.includes(type) ? (
                        <FaCheck style={{ color: 'green', fontSize: '1em' }} />
                      ) : (
                        <AiOutlineClose
                          style={{ color: 'red', fontSize: '1em' }}
                        />
                      )}
                    </span>
                    <span className="checkProduct__skinTypesText">
                      {ProductSkinTypes[type as keyof typeof ProductSkinTypes]}
                    </span>
                  </div>
                ))}
              </div>
              {getCommonValues(
                Object.keys(ProductSkinConditions),
                matchSkinTypes
              ).length ? (
                <>
                  <span className="generalText generalTitle">
                    Match for skin condition:
                  </span>
                  <div className="checkProduct__skinTypesList">
                    {Object.keys(ProductSkinConditions).map((type) => (
                      <div className="checkProduct__skinTypesItem" key={type}>
                        <span className="checkProduct__skinTypesClass">
                          {matchSkinTypes.includes(type) ? (
                            <FaCheck
                              style={{ color: 'green', fontSize: '1em' }}
                            />
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
              {renderMatchMessage()}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export { CheckProduct };
