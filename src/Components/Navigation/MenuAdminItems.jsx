import React from 'react';
import AdminDropdown from './AdminDropdown.jsx';

const MenuAdminItems = ({items}) => {
    return (
        <li className="menu-items">
          {items.submenu ? (
            <>
              <button type="button" aria-haspopup="menu">
                {items.title}{' '}
              </button>
              <AdminDropdown submenus={items.submenu}/>
            </>
          ): (
            <a href={items.url}>{items.title}</a>
          )}
        </li>
      )
  
}

export default MenuAdminItems