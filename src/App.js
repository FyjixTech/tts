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
import Navbar from "./components/navbar";
import ApprovePayments from "./components/approvepayments";
import Login from "./components/login";
import Footer from "./components/footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();
  return (
    <div className="libre-baskerville-regular">
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
       

        <Route
          path="/"
          element={
            <>
            <Navbar/>
              <div style={{ marginTop: "30px" }}>
                <Login />
              </div>
              <Footer/>
            </>
          }
        />
        
        <Route
          path="/app/home"
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
          path="/app/my-account"
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
          path="/app/how-to-use"
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
          path="/app/change-password"
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
          path="/app/delete-account"
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
          path="/app/my-payments"
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
          path="/app/payment-plans"
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
          path="/app/approve-payments"
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
          path="/app/new-user"
          element={
            <>
              <Navbar />
              <div style={{ marginTop: "20px" }}>
                <center>
                  <NewUser />
                </center>
              </div>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
