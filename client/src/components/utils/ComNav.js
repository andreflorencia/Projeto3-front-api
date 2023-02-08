import React from "react";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";
import { Outlet } from "react-router";
import Container from "../layout/Container";

export default () => {
  return (
    <>
      <NavBar />
      <Container customClass="min-height">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};
