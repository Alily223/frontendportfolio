import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { menuItems } from '../../menuItems.js';
import MenuItems from './MenuItems.jsx';
import { menuadminItems } from '../../menuadminitem.js';
import MenuAdminItems from './MenuAdminItems.jsx';
import PowerIconImg from '../../assests/PowerIcon.png';

const Navigation = ({userLogInStatus, setUserLogInStatus , adminLogInStatus, setAdminLogInStatus, username, setUsername}) => {
    const navigate = useNavigate();

    const signOut = () => {
        setUserLogInStatus("NOT_LOGGED_IN")
        setAdminLogInStatus("NOT_LOGGED_IN")
        setUsername("")
        localStorage.setItem("token", null);
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
                        <ul className="user-menu">
                            {menuItems.map((menu, index) => {
                                return (
                                    <MenuItems items={menu} key={index} />
                                )
                            }) }
                        </ul>
                        <ul className="admin-user-menu">
                            {menuadminItems.map((menu, index) => {
                                return (
                                    <MenuAdminItems items={menu} key={index} />
                                )
                            }) }
                        </ul>
                    
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
                        
                        <ul className="user-menu">
                            {menuItems.map((menu, index) => {
                                return (
                                    <MenuItems items={menu} key={index} />
                                )
                            }) }
                        </ul>
                    
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