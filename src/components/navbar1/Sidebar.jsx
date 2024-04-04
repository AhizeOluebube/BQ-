import React from "react";
import { useState } from "react";
import { Offcanvas, Image } from "react-bootstrap";
import { GrMenu } from "react-icons/gr";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <GrMenu onClick={handleShow} className="d-lg-none cursor" size="30px" />
      <Offcanvas show={show} onHide={handleClose} className="bgNav w-75 h-75">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>
            {user && (
              <div className="d-flex gap-3 align-items-center text-white">
                <NavLink to="/profile">
                  <Image
                    src={user?.avatar}
                    roundedCircle
                    className="object-fit-cover"
                    style={{ width: "40px", height: "40px" }}
                    alt={user?.username}
                  />
                </NavLink>
                <NavLink to="/profile" className="text-white">
                  Hi, {user.username}
                </NavLink>
              </div>
            )}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column gap-3 ">
            <NavLink to="/" className="text-white">
              HOME
            </NavLink>
            <NavLink to="/topic-selection" className="text-white">
              Topic
            </NavLink>
            <NavLink to="/" className="text-white">
              Spaces
            </NavLink>
            {!user && (
              <div>
                <hr className="text-white" />
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? "activeLink" : "no_activeLink text-white"
                  }
                >
                  Register
                </NavLink>
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    isActive ? "activeLink" : "no_activeLink text-white"
                  }
                >
                  Sign In
                </NavLink>
              </div>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
