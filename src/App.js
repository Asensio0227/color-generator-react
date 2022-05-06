import React, { useEffect, useState } from 'react';
import SingleColor from './SingleColor';
import Navbar from './Navbar';
import Loading from './loading';

import Values from 'values.js'

const App = () => {
  const [color, setColor] = useState({ info: '', number: 0 });
  const [list, setList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [iserror, setIsError] = useState(false);

  const handleChange = (e) => { 
    const name=e.target.name;
    const value = e.target.value;
    setColor({ ...color, [name]: value });
  }
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    setIsLoading(true);
    if (color.info && color.number) {
      try {
        const colors = new Values(color.info).all(color.number);
        setList((color) => {
          return { ...color, colors }
        });
        setIsLoading(false);
        color.info('');
        color.number(0);
      } catch (error) {
        setIsError(true);
        setIsLoading(false)
        console.log(error);
      }
    } else {
      console.log('hello please enter value');
    }
  }
  
  if (isloading) {
    return(
      <main>
        <section className="section-center">
          <Loading/>
        </section>
      </main>
    )
  }

  return (
    <>
      <Navbar />
      <section className="container">
        <h2>color generators</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="control">
            <label htmlFor="amount">Number of colors : </label>
            <input
              type="number"
              name='amount'
              placeholder='10'
              className={`${iserror ? 'error' : null}`}
              id='amount'
              value={color.info}
              onChange={handleChange}
            />
          </div>
          <div className="control">
            <label htmlFor="amount">hex color : </label>
            <input
              type="text"
              name='amount'
              placeholder='#f158'
              className={`${iserror ? 'error' : null}`}
              id='amount'
              value={color.number}
              onChange={handleChange}
            />
          </div>
          <button className="submit-btn" type='submit'>
            submit
          </button>
        </form>
        <article className="colors">
          {list.map((color, index, hexColor) => {
            return <SingleColor key={index} {...color} hexColor={hexColor.index} index={index}/>
          })}
        </article>
      </section>
    </>
  )
}

export default App
