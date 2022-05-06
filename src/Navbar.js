import React, { useEffect, useRef, useState } from 'react'
import { social, links } from './data';

import {FaBars} from 'react-icons/fa'

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksRef = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    
    if (showLinks) {
      container.current.style.height=`${linksHeight}px`;
    } else {
      container.current.style.height = `0px`;
    }
  },[showLinks])

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <h4>sky<span>coding</span></h4>
          <button onClick={() => setShowLinks(!showLinks)} className="nav-toggle">
            <FaBars/>
          </button>
        </div>
        <div ref={container} className="links-container">
          <ul ref={linksRef} className="links">
            {links.map((link) => {
              return(
                <li key={link.id}>
                  <a href={link.url}>
                    {link.text}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <ul className="social-icons">
          {social.map((icons) => {
            return (
              <li key={icons.id}>
                <a href={icons.url}>
                  {icons.text}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
