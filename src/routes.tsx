import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import CheckoutComponent from "./pages/Checkout";
const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cart" component={Cart} />
      <Route path="/Checkout" component={CheckoutComponent} />
    </Switch>
  );
};

export default Routes;
