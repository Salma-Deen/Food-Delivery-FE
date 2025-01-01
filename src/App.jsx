import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Pages/Home/Home.jsx";
import { useReducer } from "react";
import { appReducer, initialState } from "./AppReducer";
import AppContext from "./AppContext";
import RestaurantDishes from "./Pages/Restaurant/Restaurant.jsx"
import CartPage from "./Pages/Cart/cart.jsx";
function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={"/restaurants/:id"} element={<RestaurantDishes />} />
            <Route path={"/cart"} element={<CartPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
