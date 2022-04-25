import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../images/logo2.png";
import userPhoto from "../../images/ICON/Group 2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faUtensils,
  faStore,
  faHamburger,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../SignUp/useAuth";

const Header = (props) => {
  const auth = useAuth();
  return (
    <nav className="navbar navbar-expand navbar-light bg-white py-2  sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="Urban Eatery logo" />
        </Link>

        <ul className="navbar-nav align-items-center">
          {localStorage.getItem("role_foodie") === "admin" && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}

          <li className="nav-item active">
            <Link to="/explore" className="nav-link">
              <FontAwesomeIcon icon={faUtensils} />
              <span className="badge bg-light">Explore</span>
            </Link>
          </li>

          <li className="nav-item active">
            <Link to="/pastorder" className="nav-link">
              <FontAwesomeIcon icon={faHamburger} />
              <span className="badge bg-light">My Orders</span>
            </Link>
          </li>

          <li className="nav-item active">
            <Link to="/checkout" className="nav-link">
              <FontAwesomeIcon icon={faCartArrowDown} />
              <span className="badge bg-light">
                Cart&nbsp;{props.cart.length}
              </span>
            </Link>
          </li>

          <li className="nav-item">
            {localStorage.getItem("authToken_foodie") ? (
              <Link to="/account" className="nav-link">
                {}
                <img
                  className="ml-3 circle"
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk68Nf1_1JXIcQ1XuiTaZH3FZRyj34GcyKDg&usqp=CAU"
                  }
                  width="35px"
                  alt=""
                />
              </Link>
            ) : (
              <></>
            )}
          </li>

          {localStorage.getItem("authToken_foodie") && (
            <Link to="/login" className="btn btn-danger btn-rounded">
              <button
                onClick={() => auth.signOut()}
                className="btn btn-danger btn-rounded"
              >
                Sign Out
              </button>
            </Link>
          )}

          {!localStorage.getItem("authToken_foodie") && (
            <div className="nav-link">
              <Link to="/signup" className="btn btn-danger btn-rounded">
                Login/SignUp
              </Link>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
