import React from "react";
import Navbar1 from "../components/navbar1/Navbar1";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Topics from "../components/topics/Topics";
import AskQuestions from "../components/questions/AskQuestions";
import useAuth from "../hooks/useAuth";

const RootLayout = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar1 />
      <Container className="d-flex gap-4 mt-4 mt-md-5 py-5">
        <Topics />

        <div
          className="px-2 px-md-4 outlet"
          style={{ minHeight: "95dvh", maxWidth: "500px" }}
        >
          {user && <AskQuestions/>}
          <Outlet />
        </div>

        {/* outlet renders children if there is one */}
      </Container>
    </>
  );
};

export default RootLayout;
