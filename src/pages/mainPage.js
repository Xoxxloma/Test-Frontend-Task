import React, { useEffect, useContext } from "react";
import { ShopContext } from "../Context/shopState.js";
import { Card } from "../components/card.js";

export const MainPage = () => {
  const { products, getProducts } = useContext(ShopContext);

  useEffect(() => {
    
    getProducts(); //emulation of loading from server
    // eslint-disable-next-line  
  }, []);

  return (
    <div className="container1">
      {products.map((item, idx) => (
        <React.Fragment key={idx}>
          <Card item={item} />
        </React.Fragment>
      ))}
    </div>
  );
};
