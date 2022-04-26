import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  AdminRoute,
  Auth0ProviderWithHistory,
} from "./components/SignUp/useAuth";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Foods from "./components/Foods/Foods";
import Blog from "./components/Blog/Blog";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import Shipment from "./components/Shipment/Shipment";
import OrderComplete from "./components/OrderComplete/OrderComplete";
import FoodDetails from "./components/FoodDetails/FoodDetails";
import SearchResult from "./components/SearchResult/SearchResult";
import Account from "./components/Account/Account";
import Restaurent from "./components/Restaurant/Resturant";
import PastOrder from "./components/PastOrder/FoodsPastOrder";
import StripeComponent from "./components/StripePayment/StripeComponent";
import Admin from "./components/Admin/AdminPage";
import SignUp from "./components/SignUp/SignUp";
import { AuthProvider } from "./components/SignUp/useAuth";
function App() {
  const [cart, setCart] = useState([]);

  const [grandTotal, setGrandTotal] = useState(0);

  const [deliveryDetails, setDeliveryDetails] = useState({
    toDoor: "Delivery To Door",
    read: null,
    businessName: null,
    address: null,
  });

  const [restaurant, setrestaurant] = useState();
  const [orderDetails, setorderDetails] = useState({
    deliveryDetails: deliveryDetails,
    orderID: null,
    timestamp: null,
  });

  function paymentHandler(amount) {
    setGrandTotal(amount);
  }

  const setorderDetailsHandler = (data) => {
    setorderDetails(data);
  };

  const deliveryDetailsHandler = (data) => {
    setDeliveryDetails(data);
  };

  const cartHandler = (currentFood) => {
    const alreadyAdded = cart.find((item) => item._id === currentFood._id);

    const updatedCart = cart.filter(
      (item) => item.restaurant === currentFood.restaurant
    );

    if (!alreadyAdded) {
      console.log("cart handler");
      const newCart = [...updatedCart, currentFood];
      console.log(newCart);
      setCart(newCart);
    }
  };

  const checkOutItemHandler = (foodID, foodQuantity) => {
    const newCart = cart.map((item) => {
      if (item._id === foodID) {
        item.quantity = foodQuantity;
      }
      return item;
    });

    const filteredCart = newCart.filter((item) => item.quantity > 0);
    setCart(filteredCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/">
            <Header cart={cart} />
            <Banner />
            <Foods cart={cart} />
            <Blog />
            <Footer />
          </Route>

          <Route path="/food/:id">
            <Header cart={cart} />
            <FoodDetails
              cart={cart}
              cartHandler={cartHandler}
              setrestaurant={setrestaurant}
            />
            <Footer />
          </Route>

          <Route path="/search=:searchQuery">
            <Header cart={cart} />
            <Banner />
            {/* <SearchResult /> */}
            <Blog />
            <Footer />
          </Route>

          <Route path="/checkout">
            <Header cart={cart} />
            <Shipment
              cart={cart}
              orderDetails={orderDetails}
              setorderDetailsHandler={setorderDetailsHandler}
              deliveryDetails={deliveryDetails}
              deliveryDetailsHandler={deliveryDetailsHandler}
              checkOutItemHandler={checkOutItemHandler}
              clearCart={clearCart}
              paymentHandler={paymentHandler}
            // restaurant={restaurant}
            />
            <Footer />
          </Route>

          <Route path="/order-complete">
            <Header cart={cart} />
            <OrderComplete
              deliveryDetails={deliveryDetails}
              setorderDetailsHandler={setorderDetailsHandler}
              orderDetails={orderDetails}
            />
            <Footer />
          </Route>

          <Route path="/explore">
            <Header cart={cart} />
            <Restaurent cart={cart} />
            <Footer />
          </Route>

          <Route path="/account">
            <Header cart={cart} />
            <Account />
            <Footer />
          </Route>

          <Route exact path="/pastOrder">
            <Header cart={cart} />
            <PastOrder cart={cart} orderDetails={orderDetails} />
            <Footer />
          </Route>

          <Route path="/signup">
            <SignUp login={false} />
          </Route>

          <Route path="/login">
            <SignUp login={true} />
          </Route>

          <Route path="/payment">
            <StripeComponent grandTotal={grandTotal} />
          </Route>

          <AdminRoute path="/admin">
            <Admin />
          </AdminRoute>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
