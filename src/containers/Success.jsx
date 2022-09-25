import React from 'react';
import '../styles/components/Success.css';
import ChartMap from '../components/Map';
import AppContext from '../context/AppContext';
import { useContext } from 'react';
const Success = () => {
  const { state } = useContext(AppContext);
  const { buyer } = state;
  console.log(buyer);
  return (
    <div className="Succes">
      <div className="Success-content">
        <h2>{buyer[0].name}, gracias por tu compra</h2>
        <span>Tu pedido llegara en 3 dias a tu dirección:</span>
        <div className="Success-map">Google Maps</div>
      </div>
      <ChartMap></ChartMap>
    </div>
  );
};

export default Success;
