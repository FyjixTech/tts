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
import ApprovePayments from "./components/approvepayments";
import Pricing from "./components/pricing";
import Faq from "./components/faq";
import Features from "./components/features";
import Login from "./components/login";
import Footer from "./components/footer"
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();
  return (
    <div className="libre-baskerville-regular">
      <ScrollToTop/>
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
          path="/login"
          element={
            <>
            <Navbar/>
              <div style={{marginTop:"100px"}}>
                <Login />
              </div>
              <Footer/>
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
            <Navbar/>
            <div style={{marginTop:"100px"}}>
              <center>           
                 <NewUser />
              </center>
            </div>
            <Footer/>
            </>
          }
        />
        <Route
          path="/pricing"
          element={
            <>
              <Navbar />
              <Pricing />
            </>
          }
        />
        <Route
          path="/faqs"
          element={
            <>
              <Navbar />
              <Faq />
            </>
          }
        />
        <Route
          path="/features"
          element={
            <>
              <Navbar />
              <Features />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
