import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import AdminPage from "../pages/AdminPage/AdminPage";
import BeveragesPage from "../pages/BeveragesPage/BeveragesPage";
import CartPage from "../pages/CartPage/CartPage";
import ClientsOrdersPage from "../pages/ClientsOrdersPage/ClientsOrdersPage";
import DessertsPage from "../pages/DessertsPage/DessertsPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import CreateYourOwnPizza from "../shared/components/CreatePizza/CreateYourOwnPizza";
import { RequireAuth } from "../shared/components/RequireAuth/RequireAuth";
import { useUserContext } from "../shared/contexts/UserContext";
import { RegisterBeverage } from "../components/RegisterBeverage/RegisterBeverage";
import { RegisterDessert } from "../components/RegisterDesserts/RegisterDessert";

const AppRoutes = ({ jwt }) => {
  const { userRole } = useUserContext();

  console.log(typeof userRole);

  return (
    <Router>
      <Navbar jwt={jwt} />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {userRole === "admin" && (
          <Route
            exact
            path="/admin"
            element={
              <RequireAuth>
                <AdminPage />
              </RequireAuth>
            }
          />
        )}

        <Route
          path="/admin/post/beverages"
          element={
            <RequireAuth>
              {userRole === "basic" ? (
                <RegisterBeverage />
              ) : (
                <Navigate to="/" />
              )}
            </RequireAuth>
          }
        />

        <Route
          path="/admin/post/desserts"
          element={
            <RequireAuth>
              {userRole === "basic" ? <RegisterDessert /> : <Navigate to="/" />}
            </RequireAuth>
          }
        />

        <Route path="/beverages" element={<BeveragesPage />} />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <CartPage />
            </RequireAuth>
          }
        />

        <Route
          path="/orders"
          element={
            <RequireAuth>
              <ClientsOrdersPage />
            </RequireAuth>
          }
        />

        <Route path="/createpizza" element={<CreateYourOwnPizza />} />
        <Route path="/desserts" element={<DessertsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
