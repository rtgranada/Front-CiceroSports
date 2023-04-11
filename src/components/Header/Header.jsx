import React, { useRef, useEffect } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import "./header.scss";

import { motion } from "framer-motion";

import logo from "../../assets/images/eco-logo.png";
import logo2 from "../../assets/images/cicero_logo.png";
import userIcon from "../../assets/images/user-icon.png";

import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";

import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

const nav__links = [
  { path: "home", display: "Home" },
  { path: "shop", display: "Shop" },
  { path: "cart", display: "Cart" },
];

const Header = () => {
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const profileActionsRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const menuToggle = () => {
    menuRef.current.classList.toggle("active__menu");
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  const toggleProfileActions = () => {
    profileActionsRef.current.classList.toggle("show__profileActions");
  };
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo2} alt="logo" />
              {/* <div>
                
                <h1>
                  <img src={logo2} alt="" />
                </h1>
              </div> */}
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <motion.li
                    whileHover={{ scale: 1.1 }}
                    className="nav__item"
                    key={index}
                  >
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              <motion.span whileHover={{ scale: 1.1 }} className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badgeIcon">1</span>
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="cart__icon"
                onClick={() => navigateToCart()}
              >
                <i className="ri-shopping-bag-line"></i>
                <span className="badgeIcon">{totalQuantity}</span>
              </motion.span>
              <div className="profile">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt="user"
                  onClick={toggleProfileActions}
                />
                <div
                  className="d-flex profile__actions"
                  ref={profileActionsRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <span onClick={logout}>Logout</span>
                      <Link to="/dashboard">Dashboard</Link>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to="/signup">Signup</Link>{" "}
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
