import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import LinkedIn from "../../assests/Linked-in.png";
import Github from "../../assests/github-mark-white.png";

const HomeDashboard = () => {

  const [blogs, setBlogs] = useState([])
  const [blogsCount, setBlogsCount] = useState("")
  const [projects, setProjects] = useState([])
  const [projectsCount, setProjectsCount] = useState("")
  const [testimonials, setTestimonials] = useState([])
  const [testimonialsCount, setTestimonialsCount] = useState("")

  const tobackend = "https://backendforlilygrenportfolio.herokuapp.com"

  const navigate = useNavigate();

  const getAllBlogs = async () => {
    try {
        const response = await fetch(`${tobackend}/blog/getblogs`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error(error);
      }
  }

  const getAllProjects = async () => {
    try {
        const response = await fetch(`${tobackend}/project/GetAll`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
  }

  const getAllTestimonials = async () => {
    try {
        const response = await fetch(`${tobackend}/truepublishedtestimonials/getall`);
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error(error);
      }
  }

  useEffect(() => {
    getAllProjects();
  } , [])

  useEffect(() => {
    getAllBlogs();
  }, [])

  useEffect(() => {
   getAllTestimonials(); 
  }, [])

  useEffect(() => {
    let numberoftestimonials = testimonials.length
    setTestimonialsCount(numberoftestimonials)
  }, [testimonials,setTestimonialsCount])

  useEffect(() => {
    let numberofblogs = blogs.length
    setBlogsCount(numberofblogs)
  }, [blogs,setBlogsCount])

  useEffect(() => {
    let numberofprojects = projects.length
    setProjectsCount(numberofprojects)
  }, [projects,setProjectsCount])

  return (
    <div className="HomeDashboard-Wrapper">
      <div className="Object-Wrapper">
        <div className="Dashboard-Object-Name">
          <h2>Projects</h2>
        </div>
        <div className="Dashboard-Object-Material">
          <p>{projectsCount}</p>
        </div>
        <div className="Dashboard-Object-Link">
          <button onClick={() => navigate("/projects")}>Go To</button>
        </div>
      </div>

      <div className="Object-Wrapper">
        <div className="Dashboard-Object-Name">
          <h2>Certificates</h2>
        </div>
        <div className="COMING-SOON">
          <p>~COMING SOON~</p>
        </div>
      </div>

      <div className="Object-Wrapper">
        <div className="Dashboard-Object-Name">
          <h2>Testimonials</h2>
        </div>
        <div className="Dashboard-Object-Material">
          <p>{testimonialsCount}</p>
        </div>
        <div className="Dashboard-Object-Link">
          <button onClick={() => navigate("/testimonials")}>Go To</button>
        </div>
      </div>

      <div className="Object-Wrapper">
        <div className="Dashboard-Object-Name">
          <h2>Avg Hrs Coding</h2>
        </div>
        <div className="Dashboard-Object-Material">
          <p>6.2</p>
        </div>
      </div>

      <div className="Object-Wrapper">
        <div className="Dashboard-Object-Name">
          <h2>Blog Posts</h2>
        </div>
        <div className="Dashboard-Object-Material">
          <p>{blogsCount}</p>
        </div>
        <div className="Dashboard-Object-Link">
          <button onClick={() => navigate("/blog")}>Go To</button>
        </div>
      </div>

      <div className="Object-Wrapper">
        <div className="Dashboard-Object-Name">
          <h2>Social Media Links</h2>
        </div>
        <div className="Dashboard-Object-Material Social-Links">
          <div className="Wrapper-For-Images">
            <div className="LinkSocial">
              <img src={LinkedIn} alt="LinkOne"/>
              <a href="https://www.linkedin.com/in/austin-lilygren-7a2257141/" target="_blank">Linked-In</a>
            </div>
            
            <div className="LinkSocial">
              <img src={Github} alt="LinkTwo"/>
              <a href="https://github.com/Alily223" target="_blank">Github</a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default HomeDashboard