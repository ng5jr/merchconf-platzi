import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../containers/Home';
import Checkout from '../containers/Checkout';
import Information from '../containers/Information';
import Payment from '../containers/Payment';
import Success from '../containers/Success.jsx';
import NotFound from '../containers/NotFound';
import Layout from '../components/Layout';
import AppContext from '../context/AppContext';
import useInitialState from '../hooks/useInitialState';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const App = () => {
  const initialState = useInitialState();
  return (
    <PayPalScriptProvider
      options={{
        'client-id':
          'ARMihKqYvo8xozpqdAKIhWIs_bYV4q9JXwlHgdrZZw8JLeyWfXnmz5rsifdZ_GLmUa0AKDFNy5Yb6_w-',
      }}
    >
      <AppContext.Provider value={initialState}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/information" element={<Information />} />
              <Route path="/checkout/payment" element={<Payment />} />
              <Route path="/checkout/success" element={<Success />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </PayPalScriptProvider>
  );
};

export default App;
