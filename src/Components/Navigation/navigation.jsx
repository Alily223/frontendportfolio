import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PowerIconImg from '../../assests/PowerIcon.png';

const Navigation = ({userLogInStatus, setUserLogInStatus , adminLogInStatus, setAdminLogInStatus, username, setUsername}) => {
    const [navigationSelection, setNavigationSelection] = useState("")
    const navigate = useNavigate();

    const signOut = () => {
        setUserLogInStatus("NOT_LOGGED_IN")
        setAdminLogInStatus("NOT_LOGGED_IN")
        setUsername("")
        localStorage.setItem("token", null);
        navigate("/")
    }

    const handlenavigationSelection = (event) => {
        setNavigationSelection(event.target.value);
        navigate(event.target.value);
    }

  return (
    <>
        <nav>
            <div className="Navigation-Wrapper">
                <div className="Left-side-menu">

                    <div className="navigation-item">
                        <Link className='nav-link' to="/">
                            Home
                        </Link>
                    </div>
                    

                    <div className="navigation-item">
                        <Link className='nav-link' to="/authentication">
                            Log-In
                        </Link>
                    </div>

                    <div className="User-Name-Insert">
                        {username !== "" && userLogInStatus === "LOGGED_IN" ? (
                            <div className="User-Name">{username}</div>
                        ): <div className="User-Name">{username}</div>}
                    </div>
                </div>

               
                {userLogInStatus === "LOGGED_IN" && adminLogInStatus === "LOGGED_IN" ? (
                    <div className="Middle-menu">
                        <div className="navigation-item">
                            <Link className='nav-link' to="/projects">
                                Projects
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/blog">
                                Blog
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/testimonials">
                                Testimonials
                            </Link>
                        </div>

                        <div className="navigation-item">

                            <select value={navigationSelection} onChange={handlenavigationSelection}>
                                <option value="/">User Services</option>
                                <option value="/createtestimonial">Create Review</option>
                                <option value="/hireforwork">Hire For Work</option>
                                <option value="/contact">Contact</option>
                            </select>

                        </div>
                        

                        <div className="navigation-item">
                            
                            <select value={navigationSelection} onChange={handlenavigationSelection}>
                                <option value="/">Admin Services</option>
                                <option value="/manager">Manager</option>
                                <option value="/usermanager">User Manager</option>
                            </select>
                           
                        </div>
                        
                    
                    </div>
                    ): userLogInStatus === "LOGGED_IN" ? (
                    <div className="Middle-menu">
                        <div className="navigation-item">
                            <Link className='nav-link' to="/projects">
                                Projects
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/blog">
                                Blog
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/testimonials">
                                Testimonials
                            </Link>
                        </div>
                        
                        <div className="navigation-item">
                            
                            <select value={navigationSelection} onChange={handlenavigationSelection}>
                                <option value="/">User Services</option>
                                <option value="/createtestimonial">Create Review</option>
                                <option value="/hireforwork">Hire For Work</option>
                                <option value="/contact">Contact</option>
                            </select>
                             
                        </div>
                    
                    </div>
                    ): (
                    <div className="Middle-menu">
                        <div className="navigation-item">
                            <Link className='nav-link' to="/projects">
                                Projects
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/blog">
                                Blog
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/testimonials">
                                Testimonials
                            </Link>
                        </div>
                    
                    </div>)}

                <div className="Right-side-menu">
                    <div className="nav-link-wrapper">
                        <div className="Sign-out-wrapper" onClick={signOut}>
                            <div
                            className="Power-Icon"
                            style={{ backgroundImage: `url(${PowerIconImg})` }}
                            />
                            <div className='Text-for-power'>Sign-out</div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navigation