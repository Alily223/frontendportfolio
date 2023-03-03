import React, { useState , useEffect} from 'react';
import LinkedIn from "../../assests/Linked-in.png";
import Github from "../../assests/github-mark-white.png";

const HomeDashboard = () => {

  const[blogs, setBlogs] = useState([])
  const[blogsCount, setBlogsCount] = useState("")

  const getAllBlogs = async () => {
    try {
        const response = await fetch("http://127.0.0.1:5000/blog/getblogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error(error);
      }
  }

  useEffect(() => {
    getAllBlogs();
  }, [])

  useEffect(() => {
    let numberofblogs = blogs.length
    setBlogsCount(numberofblogs)
  }, [blogs,blogsCount])

  return (
    <div className="HomeDashboard-Wrapper">
      <div className="Object-Wrapper">
        <div className="Dashboard-Object-Name">
          <h2>Projects</h2>
        </div>
        <div className="Dashboard-Object-Material">
          <p>0</p>
        </div>
        <div className="Dashboard-Object-Link">
          LINK
        </div>
      </div>

      <div className="Object-Wrapper">
        <div className="Dashboard-Object-Name">
          <h2>Certificates</h2>
        </div>
        <div className="Dashboard-Object-Material">
          <p>0</p>
        </div>
        <div className="Dashboard-Object-Link">
          LINK
        </div>
      </div>

      <div className="Object-Wrapper">
        <div className="Dashboard-Object-Name">
          <h2>Testimonials</h2>
        </div>
        <div className="Dashboard-Object-Material">
          <p>0</p>
        </div>
        <div className="Dashboard-Object-Link">
          LINK
        </div>
      </div>

      <div className="Object-Wrapper">
        <div className="Dashboard-Object-Name">
          <h2>Hacker Ranks</h2>
        </div>
        <div className="Dashboard-Object-Material">
          <p>0</p>
        </div>
        <div className="Dashboard-Object-Link">
          LINK
        </div>
      </div>

      <div className="Object-Wrapper">
        <div className="Dashboard-Object-Name">
          <h2>In-Progress</h2>
        </div>
        <div className="Dashboard-Object-Material">
          <p>0</p>
        </div>
        <div className="Dashboard-Object-Link">
          LINK
        </div>
      </div>

      <div className="Object-Wrapper">
        <div className="Dashboard-Object-Name">
          <h2>Avg Hrs Coding</h2>
        </div>
        <div className="Dashboard-Object-Material">
          <p>6.2</p>
        </div>
        <div className="Dashboard-Object-Link">
          LINK
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
          LINK
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
              <a href="https://www.linkedin.com/in/austin-lilygren-7a2257141/">Linked-In</a>
            </div>
            
            <div className="LinkSocial">
              <img src={Github} alt="LinkTwo"/>
              <a href="https://github.com/Alily223">Github</a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default HomeDashboard