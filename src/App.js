import React, { useState } from 'react'
import SingleColor from './SingleColor';
import Navbar from './Navbar';
import ErrorBoundary from './ErrorBoundary';

import Values from 'values.js';

const App = () => {
  const [color, setColor] = useState({ text: '', count: '' });
  const [list, setList] = useState(new Values('#28cab2').all(10));
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setColor({ ...color, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let number = parseInt(color.count);
    if (number < 10) {
      number = 10;
    }
    if (number > 20) {
      number = 20;
    }
    if (color.text && color.count) {
      try {
        const colors = new Values(color.text).all(number);
        setList(colors);
        setColor({ text: '', count: '' });
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
    } else {
      console.log('hello peopl');
    }
  };

  return (
    <>
      <Navbar />
      <ErrorBoundary>
        <section className="container">
        <form onSubmit={handleSubmit} className="form">
          <h3>color generator</h3>
          <div className="control">
            <label htmlFor="count">Number of colors : </label>
            <input
              type="number" 
              name="count"
              placeholder='10'
              className={`${isError ? 'error' : null}`}
              value={color.count}
              onChange={handleChange}
              />
          </div>
          <div className="control">
            <label htmlFor="text">hex colors : </label>
            <input
              type="text" 
              name="text"
              placeholder='#f15025'
              className={`${isError ? 'error' : null}`}
              value={color.text}
              onChange={handleChange}
              />
          </div>
          <button className="submit-btn" type="submit">
            submit
          </button>
        </form>
      </section>
      </ErrorBoundary>
      <ErrorBoundary>
        <section className="colors">
        {
          list.map((color, index) => {
            return (
              <SingleColor
                key={index}
                index={index}
                {...color}
                hexColor={color.hex}
              />
            )
          })
        }
      </section>
      </ErrorBoundary>
    </>
  )
}

export default App