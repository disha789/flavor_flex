import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Loader from "./components/loader/Loader";
import { mainViewRoutes } from "./routes/main-view";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from './components/checkout';
const ProtectedRoute = lazy(() => import("./routes/protected-routes"));

const App = () => {
  return (
    
    <div>
      <PayPalScriptProvider options={initialOptions}>
       
        </PayPalScriptProvider>
      <Router>
        <Header />
        <Suspense fallback={<Loader />}>
          <main>
            <Switch>
              {mainViewRoutes.map(
                ({ protected: protect, component, url }, index) => {
                  return protect ? (
                    <ProtectedRoute
                      component={component}
                      path={url}
                      key={index}
                    />
                  ) : (
                    <Route path={url} component={component} key={index} />
                  );
                }
              )}
            </Switch>
          </main>
        </Suspense>
        <Toaster position="top-center" reverseOrder={false} />
    
        <Footer />
      </Router>

    </div>
    
  );
};
const initialOptions = {
  "client-id": "AR-D2whhF2m7-eM8B7Au6QAh2G4E_-uccTV0H-Hi5q7Nyou4tM97Ig87SCm5FwApENYxKauyt7ze_HHz",
  currency: "USD",
  intent: "capture",
};
export default App;


