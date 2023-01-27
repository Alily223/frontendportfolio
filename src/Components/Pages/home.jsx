import React from 'react';
import Aboutme from '../HomeFeatures/Aboutme';
import HomeDashboard from '../HomeFeatures/HomeDashboard';
import MoreFacts from '../HomeFeatures/MoreFacts';


const Home = () => {
  return (
    <>
        <div className="Home-Page-Wrapper">
            <Aboutme />
            <MoreFacts/>
            <HomeDashboard />
        </div>
    </>
  )
}

export default Home