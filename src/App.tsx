import { RecoilRoot } from "recoil";
import { default as MainPage } from "./cart/CartPage";
import CartPage from "./page-state/CartPage";
import { BrowserRouter, Route, Routes } from "react-router";
import OrderCheckPage from "./page-state/OrderCheckPage";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <PageRouter />
      </BrowserRouter>
    </RecoilRoot>
  );
}

function PageRouter() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path={"/cart"} element={<CartPage />} />
      <Route path={"/order-check"} element={<OrderCheckPage />} />
    </Routes>
  );
}

export default App;
