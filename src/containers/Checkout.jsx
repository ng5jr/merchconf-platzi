import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/components/Checkout.css';
import { Helmet } from 'react-helmet';

const Checkout = () => {
  const { state, removeFromCart } = useContext(AppContext);
  const { cart } = state;

  const handleRemove = (product) => () => {
    removeFromCart(product);
  };

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  return (
    <>
      <Helmet>
        <title>PlatziConf Merch - Lista de Pedidos</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TU_USER" />
        <meta name="twitter:creator" content="@TU_USER" />
        <meta name="twitter:title" content="Platzi Conf Store" />
        <meta name="twitter:description" content="Platzi Conf Store" />
        <meta
          name="twitter:image"
          content="https://s3.amazonaws.com/gndx.dev/gndxdev.png"
        />
        <meta property="og:title" content="Platzi Conf Store" />
        <meta property="og:description" content="Platzi Conf Store" />
        <meta
          property="og:image"
          content="https://s3.amazonaws.com/gndx.dev/gndxdev.png"
        />
        <meta
          property="og:url"
          content="https://platzi-store-merch-af138.web.app/"
        />
        <meta property="og:site_name" content="Platzi Conf Store" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:type" content="article" />
        <meta property="fb:app_id" content="ID_APP_FACEBOOK" />
      </Helmet>
      <div className="Checkout">
        <div className="Checkout-content">
          {cart.length > 0 ? (
            <h3>Lista de pedidos:</h3>
          ) : (
            <h3>Sin pedidos...</h3>
          )}
          {cart.map((item) => (
            <div key={item.cartId} className="Checkout-item">
              <div className="Checkout-element">
                <h4>{item.title}</h4>
                <span>${item.price}</span>
              </div>
              <button type="button" onClick={handleRemove(item)}>
                <i className="fas fa-trash-alt" />
              </button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="Checkout-sidebar">
            <h3>{`Precio Total: $ ${handleSumTotal()}`}</h3>
            <Link to="/checkout/information">
              <button type="button">Continuar pedido</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
