import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../logo.png";
function Layout(props) {

  
  const [pathname, setPathname] = useState('/');
  const checkActive = (match, location) => {
    if (!location) return false;
    setPathname(location.pathname);
    return pathname === "/" ? false : pathname === "/";
  }
  return (
    <div>
      <div className="navbar  navbar-expand-lg bg-dark navbar-dark">
        <NavLink to="/" className="navbar-brand"><img className="rounded img-fluid" style={{ height: '40px', width: '40px' }} src={logo} alt="codeclouds logo" /></NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

         
         (
              <Fragment>
                <ul className="navbar-nav ml-auto">
                  
                  <li className={"nav-item " + (pathname === '/add-student' ? 'active' : '')}>
                    <NavLink isActive={checkActive} to="/add-student" className="nav-link">Add Student</NavLink>
                  </li>
                  <li className={"nav-item " + (pathname === '/list-student' ? 'active' : '')}>
                    <NavLink isActive={checkActive} to="/list-student" className="nav-link">Student List</NavLink>
                  </li>
                </ul>
              </Fragment>
            )


        </div>
      </div>
      {props.children}
    </div >
  );
}

export default connect(
 
)(Layout);