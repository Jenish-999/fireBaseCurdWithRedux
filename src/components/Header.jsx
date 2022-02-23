import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="container-fluid my-2">
        <ul className="nav nav-tabs justify-content-center">
          <li className="nav-item">
              <Link to={'/'} className="nav-link active" aria-current="page" >
              HOME
              </Link>
          </li>
          <li className="nav-item">
           
            <Link to={'/add'} className="nav-link active" aria-current="page" >
            ADD_MEMBERS
              </Link>
          </li>
          <li className="nav-item">
           
            <Link to={'/view'} className="nav-link active" aria-current="page" >
            VIEW_MEMBERS
              </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
