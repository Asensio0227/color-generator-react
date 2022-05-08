import React, { useEffect, useState } from 'react';
import RgbToHex from './RgbtoHex';

const SingleColor = ({ rgb, weight, hexColor, index }) => {
  const [alert, setAlert] = useState(false);

  const bcg = rgb.join(',');
  const hexValue = `#${hexColor}`;
  const hex = RgbToHex(...rgb);
  
  useEffect(() => {
    let timeout = setTimeout(() => {
      setAlert(false);
    }, 3000)
    return () => {
      clearTimeout(timeout);
    }
  },[alert])
  
  return (
    <article className={`color ${index > 10 && 'color-light'}`} style={{ backgroundColor: `rgb(${bcg})` }} onClick={() => {
      setAlert(true)
      navigator.clipboard.writeText(hexValue)
    }}>
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hexValue}</p>
      {alert && <p className="alert">copied to clipboard</p>}
    </article>
  )
}

export default SingleColor