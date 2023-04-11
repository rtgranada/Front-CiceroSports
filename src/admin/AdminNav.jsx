import React from "react";
import { Container, Row } from "reactstrap";

import useAuth from "../custom-hooks/useAuth";
import "./styles/admin-nav.scss";

import logo2 from "../assets/images/cicero_logo.png";

import { NavLink } from "react-router-dom";

const admin__nav = [
  { path: "/dashboard", display: "Dashboard" },
  { path: "/dashboard/all-products", display: "All Products" },
  { path: "/dashboard/add-product", display: "Add Product" },
  { path: "/dashboard/orders", display: "Orders" },
  { path: "/dashboard/users", display: "Users" },
];

const AdminNav = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div className="logo">
                {/* <h2>E-Granada</h2> */}
                <img src={logo2} alt="logo" />
              </div>
              <div className="serach__box">
                <input
                  className="search__input"
                  type="text"
                  placeholder="Search......"
                  //   onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>

              <div className="admin__nav-top-right">
                <span>
                  <i className="ri-notification-3-line"></i>
                </span>
                <span>
                  <i className="ri-settings-2-line"></i>
                </span>
                <img src={currentUser && currentUser.photoURL} alt="" />
              </div>
            </div>
          </Container>
        </div>
      </header>
      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin__nav.map((item, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__admin-menu" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
