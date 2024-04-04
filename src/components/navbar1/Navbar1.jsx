import React from "react";
import { Button, Container, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/BQ image.png";
import Sidebar from "./Sidebar";
import useAuth from "../../hooks/useAuth";

const Navbar1 = () => {
  const { user } = useAuth();

  return (
    <nav className="bgNav text-white fixed-top w-100 p-3">
      <Container className="d-flex justify-content-between align-items-center">
        <NavLink to="/">
          <Image src={logo} alt="logo" style={{ width: "50px" }} />
        </NavLink>
        <div className="d-none d-lg-flex gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "activeLink" : "no_activeLink text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/topic-selection"
            className={({ isActive }) =>
              isActive ? "activeLink" : "no_activeLink text-white"
            }
          >
            Topics
          </NavLink>
          <NavLink
            to="/spaces"
            className={({ isActive }) =>
              isActive ? "activeLink" : "no_activeLink text-white"
            }
          >
            Spaces
          </NavLink>
        </div>

        {user ? (
          <div className="d-none d-lg-flex gap-4">
            <Button variant="light" className="rounded-4">
              Ask Question
            </Button>
            <NavLink to="/profile">
              <Image
                src={user?.avatar}
                roundedCircle
                className="object-fit-cover"
                style={{ width: "40px", height: "40px" }}
                alt={user?.username}
              />
            </NavLink>
          </div>
        ) : (
          <div className="d-none d-lg-flex gap-4 align-items-center">
            <Button
              as={NavLink}
              to="/signup"
              variant="light"
              className="rounded-5"
            >
              Register
            </Button>
            <NavLink to="/signin" className="text-white">
              Sign In
            </NavLink>
          </div>
        )}
        <Sidebar />
      </Container>
    </nav>
    // <Navbar expand="lg" className="bg-black text-white">
    //   <Container>
    //     <Link className=" text-decoration-none text-white fs-1 p">BQ</Link>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" className=" bg-white" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto d-lg-flex align-items-center gap-2 justify-content-around w-100">
    //         <div className="d-flex flex-column flex-lg-row gap-2">
    //           <Link className=" text-decoration-none text-white">Home</Link>
    //           <Link className=" text-decoration-none text-white">Spaces</Link>
    //           <Link className=" text-decoration-none text-white">Answers</Link>
    //           <Link className=" text-decoration-none text-white">
    //             Notifications
    //           </Link>
    //         </div>
    //         <div className="d-flex flex-column flex-lg-row gap-2 justify-content-end">
    //           <Link className=" text-decoration-none text-white" to="/signup">
    //             Register
    //           </Link>
    //           <Link className=" text-decoration-none text-white" to="/signin">
    //             Sign In
    //           </Link>
    //         </div>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
};

export default Navbar1;
