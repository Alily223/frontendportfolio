import React from 'react';
import logo from '../../assests/Logo.png';
import portrait from '../../assests/New_Portrait_image_clipdrop-background-removal.png';
import { useNavigate } from 'react-router-dom';

const Aboutme = () => {

  const navigate = useNavigate()

  const ChangeToPage = () => {
    navigate("/resume")
  }

  return (
    <div className="About-Me-Wrapper">
      <div className="Image-Wrapper">
        <div className="image">
          <img src={portrait} alt=""/>
        </div>
      </div>
      <div className="About-Me-Wrapper-Info">
        <div className="Name-Title">
          <h3>About Me</h3>
        </div>
        <div className="Informational-paragraph">
          <p>Greetings, my name is Austin Lilygren and I am a seasoned full-stack web developer with a diverse set of web skills. My primary objective is to deliver exceptional performance and excellence to future employers through the development of top-quality websites. Furthermore, I have a strong passion for continued learning and I am excited to explore new opportunities and expand my knowledge in web development.<br/><br/>I firmly believe that the coding community is an ever-evolving industry, and I am committed to staying up-to-date with the latest advancements in web development. As an open-minded and eager learner, I am always on the lookout for opportunities to improve my skills and collaborate with like-minded individuals.<br/><br/>In summary, I am a dedicated full-stack web developer who is passionate about delivering top-notch results to future employers. I am driven to expand my knowledge and expertise in web development, and I am eager to collaborate with prospective employers who share my commitment to excellence and continued learning.</p>
        </div>
        <div className="Resume-link">
          <button type="button" onClick={() => ChangeToPage()}>Resume</button>
        </div>
      </div>
      <div className="Logo">
          <img src={logo} alt="Logo-IMG"/>
        </div>
    </div>
  )
}

export default Aboutme