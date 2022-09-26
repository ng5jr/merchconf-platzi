import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/components/Payment.css';
import { PayPalButtons } from '@paypal/react-paypal-js';

const Payments = () => {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;
  const [paidFor, setPaidFor] = useState(false);

  const navigate = useNavigate();
  const sumTotalAmount = (cart) => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  const handleApprove = (orderID) => {
    setPaidFor(true);
  };

  const history = useNavigate();
  if (paidFor) {
    history('/checkout/success');
  }

  const handlePaymentSuccess = (data) => {
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer: buyer,
        product: cart,
        payment: data,
      };
      addNewOrder(newOrder);
      navigate('/checkout/success');
    }
  };

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido:</h3>

        {cart.map((item) => {
          return (
            <div className="Payment-item" key={item.cartId}>
              <div className="Payment-element">
                <h4>{item.title}</h4>
                <span>${item.price}</span>
              </div>
            </div>
          );
        })}
        <div className="Checkout-sidebar">
          <h3>{`Precio Total: $ ${sumTotalAmount(cart)}`}</h3>
        </div>
        <div className="Payment-button">
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: sumTotalAmount(cart),
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                const name = details.payer.name.given_name;
                handleApprove(data.orderID);
              });
            }}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Payments;
