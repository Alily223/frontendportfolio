import React from 'react';
import { Link } from 'react-router-dom';

const AdminDropdown = ({ submenus }) => {
    return (
        <ul className="dropdown">
            {submenus.map((submenu, index) => (
                <li key={index} className="menu-items">
                    <Link className="Menu-Item" to={submenu.url}>
                        {submenu.title}
                    </Link>
                </li>
            ))}
        </ul>
      )
}

export default AdminDropdown