import React from "react";
import { BrowserRouter } from "react-router-dom";

import GlobalStyles from "./styles/global";
import Routes from "./routes";

import { CartProvider } from "./hooks/useCart";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <CartProvider>
        <GlobalStyles />
        <Routes />
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
