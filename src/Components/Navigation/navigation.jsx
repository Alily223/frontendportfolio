import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import PowerIconImg from '../../assests/PowerIcon.png'

const Navigation = ({userLogInStatus, setUserLogInStatus , adminLogInStatus, setAdminLogInStatus, username, setUsername}) => {
    const navigate = useNavigate();

    const signOut = () => {
        setUserLogInStatus("NOT_LOGGED_IN")
        setAdminLogInStatus("NOT_LOGGED_IN")
        setUsername("")
        navigate("/")
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
                        {username !== "" ? (
                            <div className="User-Name">{username}</div>
                        ): <div className="User-Name">GUEST</div>}
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
                            <Link className='nav-link' to="/unfinishedprojects">
                                In-progress
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/certificates">
                                Certificates
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/blog">
                                Blog
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/hackerrank">
                                Hacker Ranks
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/testimonials">
                                Testimonials
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/createtestimonial">
                                Create Testimonial
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/hireforwork">
                                Hire For Work
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/contact">
                                Contact
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/manager">
                                Manager
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/usermanager">
                                User Manager
                            </Link>
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
                            <Link className='nav-link' to="/unfinishedprojects">
                                In-progress
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/certificates">
                                Certificates
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/blog">
                                Blog
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/hackerrank">
                                Hacker Ranks
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/testimonials">
                                Testimonials
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/createtestimonial">
                                Create Testimonial
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/hireforwork">
                                Hire For Work
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/contact">
                                Contact
                            </Link>
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
                            <Link className='nav-link' to="/unfinishedprojects">
                                In-progress
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/certificates">
                                Certificates
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/blog">
                                Blog
                            </Link>
                        </div>
                        <div className="navigation-item">
                            <Link className='nav-link' to="/hackerrank">
                                Hacker Ranks
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