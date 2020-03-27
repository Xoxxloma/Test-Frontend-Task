import React, { useContext } from "react";
import { ShopContext } from "../Context/shopState";

export const ShoppingCart = () => {
  const { shopCart, updateCart, removeFromCart } = useContext(ShopContext);
  const totalOrder = shopCart.reduce((acc, value) => acc + value.count, 0);
  const totalSum = shopCart.reduce((acc, value) => acc + value.total, 0);

  return (
    <div className="container">
      {shopCart.length === 0 ? (
        <div className="center">Товаров в корзине нет</div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Товар</th>
                <th scope="col">Количество</th>
                <th scope="col">Итого</th>
                <th scope="col">Удалить</th>
              </tr>
            </thead>
            <tbody>
              {shopCart.map((item, idx) => (
                <tr key={item.productId}>
                  <th scope="row">{idx + 1}</th>
                  <td>{item.title}</td>
                  <td>
                    <button
                      className="btn btn-outline-warning btn float-center ml-3 mr-3"
                      onClick={() => updateCart(item.productId, -1)}
                    >
                      <i className="fa fa-minus" />
                    </button>
                    <span className="itemCount">{item.count}</span>
                    <button
                      className="btn btn-outline-warning btn float-center ml-3 mr-3"
                      onClick={() => updateCart(item.productId, 1)}
                    >
                      <i className="fa fa-plus" />
                    </button>
                  </td>
                  <td>{item.total}</td>
                  <td>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="btn btn-outline-warning btn float-center ml-3 mr-3"
                    >
                      <i className="fa fa-trash-o" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="float-right mt-2">
            В вашей корзине {totalOrder} товаров на сумму {totalSum} рублей.
          </div>
        </>
      )}
    </div>
  );
};
