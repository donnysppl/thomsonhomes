import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {

  return (
    <>
      <div className="sidebar">
        <div className="logo-part">
          <h1>logo
          </h1>
        </div>
        <hr />
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link" to={'/admin/dashboard'}>Dashboard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={'/admin/banner'}>Banner</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={'/admin/category'}>Category</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={'/admin/product'}>Product</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={'/admin/pages'}>Pages</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={'/admin/media'}>Media</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={'/admin/contact'}>Contact</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={'/admin/brand-store'}>Brand Store</NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}
