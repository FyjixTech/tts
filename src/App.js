import "./App.css";
import Home from "./components/home";
import NewUser from "./components/newUser";
import { Route, Routes, useLocation } from "react-router";
import TemporaryDrawer from "./components/sidebar";
import MyAccount from "./components/myaccount";
import PaymentPlans from "./components/paymentplans";
import MyPayments from "./components/mypayments";
import Instructions from "./components/instructions";
import ChangePassword from "./components/changepassword";
import DeleteAccount from "./components/deleteaccount";
import Homepage from "./components/homepage";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ApprovePayments from "./components/approvepayments";

function App() {
  const location = useLocation();

  return (
    <div className="libre-baskerville-regular">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Homepage />
              {/* <Login /> */}
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <TemporaryDrawer />
              <div className="card generatorCard mt-1">
                <Home />
              </div>
            </>
          }
        />
        <Route
          path="/my-account"
          element={
            <>
              <TemporaryDrawer />
              <div className="card generatorCard mt-1">
                <MyAccount />
              </div>
            </>
          }
        />

        <Route
          path="/how-to-use"
          element={
            <>
              <TemporaryDrawer />
              <div className="card generatorCard mt-1">
                <Instructions />
              </div>
            </>
          }
        />

        <Route
          path="/change-password"
          element={
            <>
              <TemporaryDrawer />
              <div className="card generatorCard mt-1">
                <ChangePassword />
              </div>
            </>
          }
        />

        <Route
          path="/delete-account"
          element={
            <>
              <TemporaryDrawer />
              <div className="card generatorCard mt-1">
                <DeleteAccount />
              </div>
            </>
          }
        />

        <Route
          path="/my-payments"
          element={
            <>
              <TemporaryDrawer />
              <div className="card generatorCard mt-1">
                <MyPayments />
              </div>
            </>
          }
        />
        <Route
          path="/payment-plans"
          element={
            <>
              <TemporaryDrawer />
              <div className="card generatorCard mt-1">
                <PaymentPlans />
              </div>
            </>
          }
        />

        <Route
          path="/approve-payments"
          element={
            <>
              <TemporaryDrawer />
              <div className="card generatorCard mt-1">
                <ApprovePayments />
              </div>
            </>
          }
        />

        <Route
          path="/new-user"
          element={
            <>
              <NewUser />
            </>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
