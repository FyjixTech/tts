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
import Footer from "./components/footer";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./components/contact";
import Privacypolicy from "./components/privacypolicy";
import Refundpolicy from "./components/refundpolicy";
import Termsconditions from "./components/termsconditions";
import About from "./components/about";
import Languages from "./components/languages";

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
              <Navbar />
              <div style={{ marginTop: "100px" }}>
                <Login />
              </div>
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <div style={{ marginTop: "100px" }}>
                <Contact />
              </div>
              <Footer />
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
              <Navbar />
              <div style={{ marginTop: "100px" }}>
                <center>
                  <NewUser />
                </center>
              </div>
              <Footer />
            </>
          }
        />
        <Route
          path="/pricing"
          element={
            <>
              <Navbar />
              <Pricing />
              <Footer />
            </>
          }
        />
        <Route
          path="/faqs"
          element={
            <>
              <Navbar />
              <Faq />
              <Footer />
            </>
          }
        />
        <Route
          path="/features"
          element={
            <>
              <Navbar />
              <Features />
              <Footer />
            </>
          }
        />

        <Route
          path="/terms-and-conditions"
          element={
            <>
              <Navbar />
              <div className="container" style={{marginTop:"100px"}}>
              <Termsconditions />
              </div>  
              <Footer />
            </>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <>
              <Navbar />
              <div className="container" style={{marginTop:"100px"}}>
              <Privacypolicy />
              </div>
              <Footer />
            </>
          }
        />
        <Route
          path="/refund-policy"
          element={
            <>
              <Navbar />
              <div className="container" style={{marginTop:"100px"}}>
              <Refundpolicy />
              </div>
              <Footer />
            </>
          }
        />
          <Route
          path="/about-fyjix-tts"
          element={
            <>
              <Navbar />
              <div className="container" style={{marginTop:"100px"}}>
              <About />
              </div>  
              <Footer />
            </>
          }
        />
        <Route
          path="/languages"
          element={
            <>
              <Navbar />
              <div className="container" style={{marginTop:"100px"}}>
              <Languages />
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
