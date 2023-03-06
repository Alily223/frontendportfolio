import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hireforwork = () => {
  const navigate = useNavigate();
  return (
    <div className="Page-Wrapper">
      <div className="Hire-For-Work-Page-Wrapper">
        <div className="Commission-A-Site">

          <div className="Types-Of-Sites-To-Commission">
            <h2>Types of Websites to Commission</h2>
            <ul>
              <li>Blog Website</li>
              <li>Buisness Website</li>
              <li>E-commerce Website</li>
              <li>Portolio Website</li>
              <li>Educational Website</li>
              <li>Social Network Website</li>
              <li>News Website</li>
              <li>Magazine Website</li>
              <li>Forum Website</li>
              <li>Community Website</li>
              <li>Gaming Website</li>
              <li>Humor Website</li>
              <li>Music Website</li>
              <li>Art Website</li>
              <li>Photography Website</li>
              <li>Travel Website</li>
              <li>Food Website</li>
              <li>ETC...</li>
            </ul>
          </div>

          <div className="Availability-Schedule">
            <h2>My Availabilty</h2>
            <p>I'll take on a maximum of four projects at a time one small, one medium, one large, and one extra.</p>
            <div className="Slots-Wrapper">

              <div className="Slot">
                <div className="Title-Of-Slot">
                  <h3>Small Slot</h3>
                </div>
                
                <div className="Availability-For-Slot">
                  <p>Open</p>
                </div>
              </div>
              
              <div className="Slot">
                <div className="Title-Of-Slot">
                  <h3>Medium Slot</h3>
                </div>
                
                <div className="Availability-For-Slot">
                  <p>Open</p>
                </div>
              </div>
              
              <div className="Slot">
                <div className="Title-Of-Slot">
                  <h3>Large Slot</h3>
                </div>
                
                <div className="Availability-For-Slot">
                  <p>Open</p>
                </div>
              </div>
              
              <div className="Slot">
                <div className="Title-Of-Slot">
                  <h3>Extra Slot</h3>
                </div>
                
                <div className="Availability-For-Slot">
                  <p>Open</p>
                </div>
              </div>

            </div>
            
          </div>

          <div className="Contact-Me-About-Hiring">
            <button type="button" onClick={() => navigate("/contact")}>CONTACT ME</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hireforwork