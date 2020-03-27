import React, { useState, useContext } from "react";
import { ShopContext } from "../Context/shopState";
import { Link } from "react-router-dom";

export const Card = ({ item }) => {
  const {
    code,
    title,
    unit,
    unitAlt,
    priceGold,
    priceGoldAlt,
    priceRetail,
    priceRetailAlt,
    productId,
    assocProducts,
    primaryImageUrl,
    unitFull,
    unitRatioAlt,
    unitRatio
  } = item;

  const { updateCart } = useContext(ShopContext);
  const [singleProduct, setSingle] = useState(true);
  const [count, setCount] = useState(1);
  const assocCorrector = assocProducts.split("\n");
  const modifyImageFormat = `${primaryImageUrl.slice(
    0,
    primaryImageUrl.length - 4
  )}_220x220_1${primaryImageUrl.slice(primaryImageUrl.length - 4)}`;

  const addToCartHandler = (productId, count) => {
    updateCart(productId, count);
    setCount(1);
  };
  const incHandler = () => {
    setCount(count + 1);
  };

  const decHandler = () => {
    if (count <= 1) {
      return;
    }
    setCount(count - 1);
  };

  const singleHandler = () => {
    setSingle(true);
  };
  const pluralHandler = () => {
    setSingle(false);
  };

  return (
    <div className="product product_horizontal">
      <span className="product_code">Код: {code}</span>
      <div className="product_status_tooltip_container">
        <span className="product_status">Наличие</span>
      </div>
      <div className="product_photo">
        <Link to="/" className="url--link product__link">
          <img src={modifyImageFormat} alt="commodity pic" />
        </Link>
      </div>
      <div className="product_description">
        <Link to="/" className="product__link">
          {title}
        </Link>
      </div>
      <div className="product_tags hidden-sm">
        <p>Могут понадобится: </p>
        {assocCorrector &&
          assocCorrector.map((product, idx) => (
            <Link to="/" className="url--link" key={idx}>
              {product}
            </Link>
          ))}
      </div>
      <div className="product_units">
        <div className="unit--wrapper">
          <div
            className={
              singleProduct ? "unit--select unit--active" : "unit--select"
            }
            onClick={() => singleHandler()}
          >
            <p className="ng-binding">За {unitAlt}</p>
          </div>
          <div
            className={
              singleProduct ? "unit--select" : "unit--select unit--active"
            }
            onClick={() => pluralHandler()}
          >
            <p className="ng-binding">За {unit}</p>
          </div>
        </div>
      </div>
      <p className="product_price_club_card">
        <span className="product_price_club_card_text">
          По карте
          <br />
          клуба
        </span>
        <span className="goldPrice">
          {singleProduct ? priceGold : priceGoldAlt} ₽
        </span>
      </p>
      <p className="product_price_default">
        <span className="retailPrice">
          {singleProduct ? priceRetail : priceRetailAlt} ₽
        </span>
      </p>
      <div className="product_price_points">
        <p className="ng-binding">Можно купить за {priceGoldAlt} балла</p>
      </div>
      <div className="list--unit-padd"></div>
      <div className="list--unit-desc">
        <div className="unit--info">
          <div className="unit--desc-i"></div>
          <div className="unit--desc-t">
            <p>
              <span className="ng-binding">Продается упаковками:</span>
              <span className="unit--infoInn">
                {unitRatio} {unitFull} = {unitRatioAlt} {unitAlt}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="product__wrapper">
        <div className="product_count_wrapper">
          <div className="stepper">
            <input
              className="product__count stepper-input"
              type="text"
              value={count}
              readOnly={true}
            />
            <span
              className="stepper-arrow up"
              onClick={() => incHandler()}
            ></span>
            <span
              className="stepper-arrow down"
              onClick={() => decHandler()}
            ></span>
          </div>
        </div>
        <span
          className="btn btn_cart"
          data-url="/cart/"
          data-product-id={productId}
          onClick={() => addToCartHandler(productId, count)}
        >
          <span className="ic ic_cart"></span>
          <span className="ng-binding">В корзину</span>
        </span>
      </div>
    </div>
  );
};
