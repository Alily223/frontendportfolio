import React from 'react';
import Aboutme from '../HomeFeatures/Aboutme.jsx';
import HomeDashboard from '../HomeFeatures/HomeDashboard.jsx';
import MoreFacts from '../HomeFeatures/MoreFacts.jsx';


const Home = () => {
  return (
    <div className="Page-Wrapper">
      <div className="Home-Page-Wrapper">
          <Aboutme />
          <MoreFacts/>
          <HomeDashboard />
      </div>
    </div>
    
  )
}

export default Home