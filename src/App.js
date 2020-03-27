import React from "react";
import { Navbar } from "./components/navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { ShopState } from "./Context/shopState";
import { ShoppingCart } from "./pages/shoppingCart";

function App() {
  return (
    <ShopState>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/cart" component={ShoppingCart} />
        </Switch>
      </BrowserRouter>
    </ShopState>
  );
}

export default App;
