import React from 'react';
import { BeatLoader } from 'react-spinners'; 

const LoadingIndicator = ({ message = "Cargando...", size = 8, color = "#5d39fdff" }) => {
  return (
    <div className="flex items-center justify-center">
      <BeatLoader 
        size={size}
        color={color} 
        loading={true}
      />
      

      {message && <span className="ml-3">{message}</span>}
    </div>
  );
};

export default LoadingIndicator;