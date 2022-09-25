import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/components/Payment.css';
import { PayPalButton } from 'react-paypal-button-v2';

const Payments = () => {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;
  const navigate = useNavigate();
  const sumTotalAmount = (cart) => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  const paypalOptions = {
    clientId:
      'ARMihKqYvo8xozpqdAKIhWIs_bYV4q9JXwlHgdrZZw8JLeyWfXnmz5rsifdZ_GLmUa0AKDFNy5Yb6_w-',
    intent: 'capture',
    currency: 'USD',
  };

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

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: sumTotalAmount(cart),
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (data) {
      handlePaymentSuccess(data);
    });
  };

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
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
          <PayPalButton
            amount={sumTotalAmount(cart)}
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
            onError={(error) => console.log(error)}
            onCancel={(data) => console.log(data)}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Payments;
