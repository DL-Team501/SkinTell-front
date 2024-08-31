import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../assets/products.json';
import { Header } from '../components/shared';
import productImage from '../assets/product1.jpg';
import '../styles/components/Recommendation.css';
import { ProductSkinTypes } from '../generalTypes';

export interface IProduct {
  type: string;
  src: string;
  description: string;
}

const Recommendation: React.FC = () => {
  const skinType = ProductSkinTypes.normal;
  const [recommendedProducts, setRecommendedProducts] =
    useState<IProduct[]>(products);

  // const navigate = useNavigate();

  // const navToCheckProduct = () => {
  //   navigate('/checkProduct');
  // };

  return (
    <div className="recommendation">
      <Header />
      <div className="recommendation__container">
        <div className="generalTitle generalText">Recommended products</div>
        <div className="generalText">For {skinType}</div>
        <div className="recommendation__productList">
          {recommendedProducts.map((product) => (
            <div className="recommendation__product" key={product.src}>
              <img
                className="recommendation__productImage"
                src={productImage}
                alt="product"
              ></img>
              <span className="generalText">{product.type}</span>
            </div>
          ))}
        </div>
      </div>
      {/* <button className="generalButton__secondary" onClick={navToCheckProduct}>
        Check your product
      </button> */}
    </div>
  );
};

export { Recommendation };
